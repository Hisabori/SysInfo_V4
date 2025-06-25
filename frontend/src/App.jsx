// 경로: frontend/src/App.jsx

import { useEffect } from 'react'; // useEffect 추가
import { Link, Outlet } from 'react-router-dom';
import { useWebSocket } from './hooks/useWebSocket';
import { useDeviceInfo } from './features/device-info/useDeviceInfo.js'; // 우리 예전 훅도 불러오자!

const App = () => {
    const { messages, isConnected, sendMessage } = useWebSocket('ws://localhost:8082');
    const deviceInfo = useDeviceInfo(); // 디바이스 정보 가져오기

    // isConnected 상태가 true로 바뀌는 순간에 딱 한번 실행됨
    useEffect(() => {
        // 서버랑 연결됐고, 디바이스 정보도 준비됐을 때
        if (isConnected && deviceInfo) {
            console.log('서버에 디바이스 정보 전송!');
            // 서버로 보낼 메시지 포맷을 정함
            const message = {
                type: 'DEVICE_INFO',
                payload: deviceInfo,
            };
            // JSON 문자열로 바꿔서 전송
            sendMessage(JSON.stringify(message));
        }
    }, [isConnected, deviceInfo]); // isConnected나 deviceInfo가 바뀔 때마다 체크

    return (
        // ... 나머지 JSX는 이전과 동일 ...
        <div>
            <nav style={{ padding: '10px 20px', borderBottom: '1px solid #eee', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Link to="/" style={{ marginRight: '10px', textDecoration: 'none' }}>홈</Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>대시보드</Link>
                </div>
                <div>
                    <span>서버 상태: </span>
                    <span style={{ color: isConnected ? 'green' : 'red', fontWeight: 'bold' }}>
            {isConnected ? '연결됨' : '연결 끊김'}
          </span>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <div style={{ position: 'fixed', bottom: 0, left: 0, padding: '10px', background: '#f0f0f0', borderTop: '1px solid #ccc', width: '100%', maxHeight: '150px', overflowY: 'auto' }}>
                <h6 className="m-0">서버에서 받은 메시지 로그:</h6>
                <pre className="m-0 ps-3" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {messages.length > 0 ? messages[messages.length - 1] : '...'}
        </pre>
            </div>
        </div>
    );
};

export default App;