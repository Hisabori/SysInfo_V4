// 경로: /backend/server.js

import express from 'express';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성 라이브러리

const app = express();
const port = 8082;

const server = app.listen(port, () => {
    console.log(`백엔드 서버가 http://localhost:${port} 에서 시작됐습니다.`);
});

const wss = new WebSocketServer({ server });

// 접속한 클라이언트들의 정보를 저장할 곳 (id와 디바이스 정보)
const clients = new Map();

// 모든 클라이언트에게 현재 접속자 목록을 방송하는 함수
const broadcastOnlineClients = () => {
    const onlineDevices = Array.from(clients.values());
    const message = JSON.stringify({
        type: 'UPDATE_CLIENTS',
        payload: onlineDevices,
    });
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
};

wss.on('connection', (ws) => {
    // 새로운 클라이언트가 접속하면 고유 ID를 부여
    const clientId = uuidv4();
    clients.set(clientId, { id: clientId, deviceInfo: null });
    console.log(`새로운 클라이언트(${clientId}) 접속. 현재 접속자: ${clients.size}명`);

    // 클라이언트로부터 메시지를 받았을 때
    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            // 메시지 타입이 'DEVICE_INFO'일 때만 처리
            if (parsedMessage.type === 'DEVICE_INFO' && clients.has(clientId)) {
                console.log(`클라이언트(${clientId})의 정보 수신 완료.`);
                clients.get(clientId).deviceInfo = parsedMessage.payload;
                // 정보가 업데이트 됐으니, 모든 클라이언트에게 최신 목록 방송
                broadcastOnlineClients();
            }
        } catch (e) {
            console.error('잘못된 형식의 메시지:', e);
        }
    });

    // 클라이언트 접속이 끊어졌을 때
    ws.on('close', () => {
        clients.delete(clientId);
        console.log(`클라이언트(${clientId}) 접속 종료. 현재 접속자: ${clients.size}명`);
        // 접속자 수가 바뀌었으니, 모든 클라이언트에게 최신 목록 방송
        broadcastOnlineClients();
    });
});