import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const MoodInput = () => {
    const { sendMessage } = useOutletContext();
    const [day, setDay] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!day || !score || score < 1 || score > 10) {
            alert('요일과 1~10 사이의 점수를 입력하세요.');
            return;
        }

        const moodMessage = {
            type: 'ADD_MOOD',
            payload: { name: day, '기분 점수': parseInt(score) }
        };

        if (sendMessage) {
            sendMessage(JSON.stringify(moodMessage));
        } else {
            console.error("sendMessage 함수를 찾을 수 없습니다.");
        }

        setDay('');
        setScore('');
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-wrap gap-2 mb-4">
            <input
                type="text"
                className="form-control bg-slate-700 border-slate-600 text-white"
                placeholder="요일 (예: 월)"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                style={{ flex: 1 }}
            />
            <input
                type="number"
                className="form-control bg-slate-700 border-slate-600 text-white"
                placeholder="기분 점수 (1-10)"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="1"
                max="10"
                style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ flex: '0 0 100px' }}>기록</button>
        </form>
    );
};

export default MoodInput;