// 경로: src/features/device-info/useDeviceInfo.js.js

import { useState, useEffect } from 'react';

export const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            // 동기적으로 바로 가져올 수 있는 정보
            const syncInfo = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                cookiesEnabled: navigator.cookieEnabled ? 'Yes' : 'No',
                cpuCores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : 'N/A',
                deviceMemory: navigator.deviceMemory ? `~${navigator.deviceMemory} GB RAM` : 'N/A',
                isSecureContext: window.isSecureContext ? 'Yes (HTTPS)' : 'No',
                screenResolution: `${window.screen.width} x ${window.screen.height}`,
                colorDepth: `${window.screen.colorDepth}-bit`,
                devicePixelRatio: window.devicePixelRatio,
            };

            // 비동기적으로 가져와야 하는 정보 (배터리)
            let batteryInfo = {};
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    batteryInfo = {
                        batteryLevel: `${Math.round(battery.level * 100)}%`,
                        isCharging: battery.charging ? 'Yes' : 'No',
                    };
                } catch (e) {
                    batteryInfo = { batteryStatus: 'Error' };
                }
            }

            // 네트워크 정보
            let connectionInfo = {};
            if ('connection' in navigator) {
                connectionInfo = {
                    connectionType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink ? `${navigator.connection.downlink} Mbps` : 'N/A',
                };
            }

            // 모든 정보를 합쳐서 상태 업데이트
            setDeviceInfo({ ...syncInfo, ...connectionInfo, ...batteryInfo });
        };

        getInfo();
    }, []); // 페이지가 처음 렌더링될 때 한번만 실행

    return deviceInfo;
};