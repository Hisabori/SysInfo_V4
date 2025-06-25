// 경로: src/store/moodStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 'persist'는 데이터를 브라우저의 localStorage에 저장해서 새로고침해도 안 날아가게 해줌
export const useMoodStore = create(
    persist(
        (set) => ({
            // 초기 데이터 (나중에 비워도 됨)
            moods: [
                { name: '월', '기분 점수': 4 },
                { name: '화', '기분 점수': 3 },
            ],
            // 데이터를 추가하는 함수
            addMood: (day, score) =>
                set((state) => ({
                    moods: [...state.moods, { name: day, '기분 점수': score }],
                })),
        }),
        {
            name: 'mood-storage', // localStorage에 저장될 때 사용될 이름
        }
    )
);