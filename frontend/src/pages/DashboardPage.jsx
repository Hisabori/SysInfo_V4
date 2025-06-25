// 경로: src/pages/DashboardPage.jsx

import { useDeviceInfo } from '../features/device-info/useDeviceInfo.js';
import SampleChart from '../features/dashboard/components/SampleChart.jsx';
import MoodInput from '../features/dashboard/components/MoodInput.jsx';
import InfoCard from '../features/device-info/components/InfoCard.jsx';
// 아이콘들을 lucide-react에서 불러오기
import { Smartphone, Globe, BatteryCharging, Cpu, ScreenShare } from 'lucide-react';

const DashboardPage = () => {
    const deviceInfo = useDeviceInfo();

    return (
        // 전체 배경을 어둡게 하고, 텍스트는 밝게
        <div className="bg-slate-900 text-slate-300 min-h-screen">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-white mb-6">대시보드</h1>

                {/* 디바이스 정보 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <InfoCard icon={Smartphone} title="OS / Platform" value={deviceInfo?.platform} colorClass="text-green-400" />
                    <InfoCard icon={Globe} title="Language" value={deviceInfo?.language} colorClass="text-blue-400" />
                    <InfoCard icon={ScreenShare} title="Screen" value={deviceInfo?.screenResolution} colorClass="text-purple-400" />
                    <InfoCard icon={Cpu} title="CPU Cores" value={deviceInfo?.cpuCores} colorClass="text-red-400" />
                    <InfoCard icon={BatteryCharging} title="Battery" value={deviceInfo?.batteryLevel} colorClass="text-yellow-400" />
                </div>

                {/* 통계 카드 */}
                <div className="bg-slate-800 p-4 md:p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">주간 기분 점수</h2>
                    <MoodInput />
                    <div style={{ width: '100%', height: 300 }}>
                        <SampleChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;