// 경로: backend/server.js

import express from 'express';
import http from 'http'; // http 모듈 직접 사용
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const port = 8082;
const app = express();

// 1. Express 앱으로 HTTP 서버를 만든다
const server = http.createServer(app);

// 2. 그 HTTP 서버에 WebSocket 서버를 연결한다
const wss = new WebSocketServer({ server });

// --- (나머지 클라이언트 관리 및 방송 로직은 이전과 동일) ---
const clients = new Map();

const broadcastOnlineClients = () => {
    const message = JSON.stringify({
        type: 'UPDATE_CLIENTS',
        payload: Array.from(clients.values()),
    });
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
};

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, { id: clientId, deviceInfo: null });
    console.log(`새로운 클라이언트(${clientId}) 접속. 현재 접속자: ${clients.size}명`);
    broadcastOnlineClients();

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === 'DEVICE_INFO' && clients.has(clientId)) {
                clients.get(clientId).deviceInfo = parsedMessage.payload;
                broadcastOnlineClients();
            }
        } catch (e) {
            console.error('잘못된 형식의 메시지:', e);
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        console.log(`클라이언트(${clientId}) 접속 종료. 현재 접속자: ${clients.size}명`);
        broadcastOnlineClients();
    });
});

// 3. 마지막으로 서버가 포트에서 듣기 시작하게 한다
server.listen(port, () => {
    console.log(`백엔드 서버가 http://localhost:${port} 에서 진짜로 시작됐습니다.`);
});