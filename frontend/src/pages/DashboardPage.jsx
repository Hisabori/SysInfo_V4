import { useOutletContext } from 'react-router-dom';
import { Server, Smartphone, Globe, BatteryCharging } from 'lucide-react';

const DashboardPage = () => {
    // App.jsx가 넘겨준 '온라인 클라이언트 목록'을 받음
    const { onlineClients } = useOutletContext();

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-white mb-6">
                관제탑 - 온라인 기기 ({onlineClients.length}대)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onlineClients.length > 0 ? (
                    onlineClients.map(client => (
                        // 각 클라이언트(기기)에 대한 정보 카드를 생성
                        <div key={client.id} className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
                            <div className="flex items-center gap-3 mb-3 border-b border-slate-700 pb-3">
                                <span className="text-green-400"><Server size={20} /></span>
                                <h2 className="text-md font-bold text-sky-400 truncate" title={client.deviceInfo?.userAgent}>
                                    {client.deviceInfo?.userAgent || '정보 수신 중...'}
                                </h2>
                            </div>
                            <ul className="text-sm text-slate-300 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Smartphone size={16} className="text-slate-500" />
                                    <span>{client.deviceInfo?.platform}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Globe size={16} className="text-slate-500" />
                                    <span>{client.deviceInfo?.language}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <BatteryCharging size={16} className="text-slate-500" />
                                    <span>{client.deviceInfo?.batteryLevel || 'N/A'} {client.deviceInfo?.isCharging ? '(충전중)' : ''}</span>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400 col-span-full text-center py-10">온라인 기기가 없습니다...</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;