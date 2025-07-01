import express from 'express';
import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 443; // https 기본 포트

// SSL 인증서 경로
const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/sosadmental.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/sosadmental.com/privkey.pem')
}, app);

server.listen(port, () => {
    console.log(`백엔드 서버가 https://sosadmental.com 에서 시작됐습니다.`);
});

const wss = new WebSocketServer({ server });

// --- 데이터 저장소 ---
const clients = new Map();
const moodHistory = [];

// --- 방송 함수들 ---
const broadcastOnlineClients = () => {
    const message = JSON.stringify({
        type: 'UPDATE_CLIENTS',
        payload: Array.from(clients.values()),
    });
    wss.clients.forEach(client => client.send(message));
};

const broadcastMoodHistory = () => {
    const message = JSON.stringify({
        type: 'UPDATE_MOODS',
        payload: moodHistory,
    });
    wss.clients.forEach(client => client.send(message));
};

// --- 메인 로직 ---
wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, { id: clientId, deviceInfo: null });
    console.log(`새 클라이언트(${clientId}) 접속. 현재 접속자: ${clients.size}명`);
    broadcastOnlineClients();

    ws.send(JSON.stringify({ type: 'UPDATE_MOODS', payload: moodHistory }));

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === 'DEVICE_INFO') {
                clients.get(clientId).deviceInfo = parsedMessage.payload;
                broadcastOnlineClients();
            }

            if (parsedMessage.type === 'ADD_MOOD') {
                console.log('새로운 기분 기록 수신:', parsedMessage.payload);
                moodHistory.push(parsedMessage.payload);
                broadcastMoodHistory();
            }

        } catch (e) { console.error('잘못된 메시지:', e); }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        console.log(`클라이언트(${clientId}) 접속 종료. 현재 접속자: ${clients.size}명`);
        broadcastOnlineClients();
    });
});
