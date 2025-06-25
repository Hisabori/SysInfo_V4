// 경로: src/features/device-info/components/InfoCard.jsx

const InfoCard = ({ icon: Icon, title, value, colorClass = 'text-sky-400' }) => {
    // 값이 없을 때 '로딩 중' 표시
    const displayValue = value || '...';

    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg flex items-center gap-4">
            <div className={`text-3xl ${colorClass}`}>
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-sm text-slate-400">{title}</p>
                <p className="text-lg font-bold text-slate-200">{displayValue}</p>
            </div>
        </div>
    );
};

export default InfoCard;