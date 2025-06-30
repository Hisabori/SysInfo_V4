import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';
import { useDeviceInfo } from './hooks/useDeviceInfo';
import { useMoodStore } from './store/moodStore';

const App = () => {
    const { messages, isConnected, sendMessage } = useWebSocket('ws://3.92.213.168/ws');
    const deviceInfo = useDeviceInfo();
    const setServerMoods = useMoodStore(state => state.setMoods);

    // 서버 연결 및 기기 정보 전송
    useEffect(() => {
        if (isConnected && deviceInfo) {
            const message = { type: 'DEVICE_INFO', payload: deviceInfo };
            sendMessage(JSON.stringify(message));
        }
    }, [isConnected, deviceInfo, sendMessage]);

    // 서버로부터 받은 메시지 처리
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = JSON.parse(messages[messages.length - 1]);
            if (lastMessage.type === 'UPDATE_MOODS') {
                setServerMoods(lastMessage.payload);
            }
        }
    }, [messages, setServerMoods]);

    const lastMessage = messages.length > 0 ? JSON.parse(messages[messages.length - 1]) : null;
    const onlineClients = lastMessage?.type === 'UPDATE_CLIENTS' ? lastMessage.payload : [];

    return (
        <div className="bg-slate-900 text-slate-300 min-h-screen">
            <nav className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <div>
                        <Link to="/" className="text-white font-bold text-lg me-4">SysInfo</Link>
                        <Link to="/dashboard" className="text-slate-300 hover:text-white">대시보드</Link>
                    </div>
                    <div>
                        <span className="text-sm">서버 상태: </span>
                        <span className={`font-bold ${isConnected ? 'text-green-400' : 'text-red-500'}`}>
              {isConnected ? '● 온라인' : '○ 오프라인'}
            </span>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet context={{ onlineClients, sendMessage }} />
            </main>
        </div>
    );
};

export default App;