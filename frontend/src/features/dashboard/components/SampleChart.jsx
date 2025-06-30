import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMoodStore } from '../../../store/moodStore';

const SampleChart = () => {
    const moods = useMoodStore((state) => state.moods);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moods}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[0, 10]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                <Legend />
                <Bar dataKey="기분 점수" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SampleChart;