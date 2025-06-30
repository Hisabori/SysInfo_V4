import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMoodStore = create(
    persist(
        (set) => ({
            moods: [], // 초기값은 빈 배열
            // 이제 서버에서 데이터를 받아서 한 번에 업데이트하는 함수만 남김
            setMoods: (newMoods) => set({ moods: newMoods }),
        }),
        {
            name: 'mood-storage',
        }
    )
);