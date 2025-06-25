// 경로: src/features/dashboard/components/MoodInput.jsx
import React, { useState } from 'react';
import { useMoodStore } from '../../../store/moodStore';

const MoodInput = () => {
    const addMood = useMoodStore((state) => state.addMood);
    const [day, setDay] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!day || !score || score < 1 || score > 10) {
            alert('요일과 1~10 사이의 점수를 입력하세요.');
            return;
        }
        addMood(day, parseInt(score));
        setDay('');
        setScore('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-wrap gap-2 mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="요일 (예: 수)"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                style={{ flex: 1 }}
            />
            <input
                type="number"
                className="form-control"
                placeholder="기분 점수 (1-10)"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="1"
                max="10"
                style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ flex: '0 0 100px' }}>추가</button>
        </form>
    );
};
export default MoodInput;