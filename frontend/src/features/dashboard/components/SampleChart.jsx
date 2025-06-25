// 경로: src/features/dashboard/components/SampleChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMoodStore } from '../../../store/moodStore'; // 창고 불러오기

const SampleChart = () => {
    const moods = useMoodStore((state) => state.moods); // 창고에서 실제 데이터 가져오기

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moods}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} /> {/* y축 범위를 0-10으로 고정 */}
                <Tooltip />
                <Legend />
                <Bar dataKey="기분 점수" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};
export default SampleChart;