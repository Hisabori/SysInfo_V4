// 경로: frontend/src/App.jsx
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';
import { useDeviceInfo } from './hooks/useDeviceInfo.js';
import { useMoodStore } from './store/moodStore';
import { useDeviceStore } from './store/deviceStore'; // <-- 새 기기 창고 불러오기

const App = () => {
    const { messages, isConnected, sendMessage } = useWebSocket('wss://sosadmental.com/ws');
    const deviceInfo = useDeviceInfo();
    const setServerMoods = useMoodStore(state => state.setMoods);
    const setOnlineClients = useDeviceStore(state => state.setOnlineClients); // <-- 기기 창고의 함수 가져오기

    // 서버 연결 및 기기 정보 전송 로직
    useEffect(() => {
        if (isConnected && deviceInfo) {
            const message = { type: 'DEVICE_INFO', payload: deviceInfo };
            sendMessage(JSON.stringify(message));
        }
    }, [isConnected, deviceInfo, sendMessage]);

    // 서버로부터 받은 메시지 처리 로직
    useEffect(() => {
        if (messages.length === 0) return;

        const lastMessage = JSON.parse(messages[messages.length - 1]);

        // 메시지 타입에 따라 올바른 창고에 데이터 저장
        if (lastMessage.type === 'UPDATE_CLIENTS') {
            setOnlineClients(lastMessage.payload);
        } else if (lastMessage.type === 'UPDATE_MOODS') {
            setServerMoods(lastMessage.payload);
        }
    }, [messages, setOnlineClients, setServerMoods]);

    return (
        <div className="bg-slate-900 text-slate-300 min-h-screen">
            <nav className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                {/* ... (네비게이션 바 내용은 그대로) ... */}
            </nav>
            <main>
                {/* 이제 Outlet은 그냥 길만 터주는 역할 */}
                <Outlet />
            </main>
        </div>
    );
};

export default App;