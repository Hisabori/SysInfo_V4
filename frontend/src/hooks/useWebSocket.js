// 경로: frontend/src/hooks/useWebSocket.js

import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null); // 웹소켓 연결을 저장할 공간

    useEffect(() => {
        // 백엔드 서버의 웹소켓 주소로 연결 시도
        ws.current = new WebSocket(url);

        // 연결에 성공했을 때
        ws.current.onopen = () => {
            console.log('웹소켓 연결 성공!');
            setIsConnected(true);
        };

        // 서버로부터 메시지를 받았을 때
        ws.current.onmessage = (event) => {
            console.log(`서버로부터 메시지 수신: ${event.data}`);
            // 받은 메시지를 messages 배열에 추가
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // 연결이 끊어졌을 때
        ws.current.onclose = () => {
            console.log('웹소켓 연결 종료.');
            setIsConnected(false);
        };

        // 에러가 발생했을 때
        ws.current.onerror = (error) => {
            console.error('웹소켓 에러:', error);
        };

        // 컴포넌트가 사라질 때(정리) 웹소켓 연결을 닫음
        return () => {
            ws.current.close();
        };
    }, [url]); // url이 바뀔 때만 다시 연결 시도

    // 프론트엔드에서 서버로 메시지를 보내는 함수
    const sendMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.error('웹소켓이 연결되지 않았습니다.');
        }
    };

    // 이 훅이 제공하는 값과 함수들
    return { messages, isConnected, sendMessage };
};