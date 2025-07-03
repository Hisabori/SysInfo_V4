// 경로: src/pages/DashboardPage.jsx

import { useDeviceStore } from '../store/deviceStore'; // <-- Outlet 대신 스토어 사용!
import { Server, Smartphone, Globe, BatteryCharging } from 'lucide-react';
import MoodTracker from '../features/dashboard/components/MoodTracker';

const DashboardPage = () => {
    // 전역 창고에서 직접 온라인 클라이언트 목록을 가져옴
    const onlineClients = useDeviceStore((state) => state.onlineClients);

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    관제탑 - 온라인 기기 ({onlineClients.length}대)
                </h1>
                <p className="text-slate-400">현재 접속 중인 모든 기기의 실시간 정보입니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {onlineClients.length > 0 ? (
                    onlineClients.map(client => (
                        <div key={client.id} className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
                            <div className="flex items-center gap-3 mb-3 border-b border-slate-700 pb-3">
                                <span className="text-green-400"><Server size={20} /></span>
                                <h2 className="text-sm font-bold text-sky-400 truncate" title={client.deviceInfo?.userAgent}>
                                    {client.deviceInfo?.userAgent || '정보 수신 중...'}
                                </h2>
                            </div>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Smartphone size={16} className="text-slate-500" />
                                    <span>OS: {client.deviceInfo?.platform}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Globe size={16} className="text-slate-500" />
                                    <span>Language: {client.deviceInfo?.language}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <BatteryCharging size={16} className="text-slate-500" />
                                    <span>Battery: {client.deviceInfo?.batteryLevel || 'N/A'} {client.deviceInfo?.isCharging ? '(충전중)' : ''}</span>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-slate-800 p-10 rounded-lg text-center">
                        <p className="text-slate-400">온라인 기기가 없습니다...</p>
                    </div>
                )}
            </div>

            <MoodTracker />
        </div>
    );
};

export default DashboardPage;