import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';
import { useDeviceInfo } from './hooks/useDeviceInfo.js';

const App = () => {
    // 이제 localhost가 아닌, 진짜 인터넷 EC2 서버 주소로 접속
    const { messages, isConnected, sendMessage } = useWebSocket('ws://3.92.213.168/ws');
    const deviceInfo = useDeviceInfo();

    // 서버에 연결되면, 내 디바이스 정보를 딱 한 번만 보냄
    useEffect(() => {
        if (isConnected && deviceInfo) {
            console.log('서버에 내 디바이스 정보 전송!');
            const message = {
                type: 'DEVICE_INFO',
                payload: deviceInfo,
            };
            sendMessage(JSON.stringify(message));
        }
    }, [isConnected, deviceInfo, sendMessage]);

    // 서버로부터 받은 메시지 중 가장 마지막 메시지를 해석
    const lastMessage = messages.length > 0 ? JSON.parse(messages[messages.length - 1]) : null;
    // 그 메시지가 '클라이언트 목록 업데이트' 메시지이면, 그 안의 클라이언트 목록을 사용
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
                {/* 자식 페이지(홈, 대시보드)에 온라인 클라이언트 목록 데이터를 넘겨줌 */}
                <Outlet context={{ onlineClients }} />
            </main>
        </div>
    );
};

export default App;