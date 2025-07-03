// 경로: frontend/src/store/deviceStore.js
import { create } from 'zustand';

export const useDeviceStore = create((set) => ({
    onlineClients: [],
    setOnlineClients: (clients) => set({ onlineClients: clients }),
}));