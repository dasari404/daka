export type PoleStatus = 'healthy' | 'dimmed' | 'fault' | 'offline';

export interface PoleData {
  id: string;
  lat: number;
  lng: number;
  status: PoleStatus;
  batteryLevel: number; // 0-100
  luxOutput: number; // 0-100
  ambientLux: number; // 0-1000
  lastMotionMinutesAgo: number;
  hasDarkZoneRisk: boolean;
}

const generateRandomPole = (id: number): PoleData => {
  const isNight = true; // Simulate night time
  const batteryLevel = Math.floor(Math.random() * 60) + 40; // 40-100%
  const hasMotion = Math.random() > 0.8;
  const isFault = Math.random() > 0.95;
  
  let status: PoleStatus = 'healthy';
  let luxOutput = 100;

  if (isFault) {
    status = 'fault';
    luxOutput = 0;
  } else if (!hasMotion) {
    status = 'dimmed';
    luxOutput = 30; // Energy saving
  }

  // Simulate Dark Zone Risk (Cluster of low output)
  // For simplicity, random here, but in real app would be spatial.
  const hasDarkZoneRisk = isFault || (luxOutput < 50 && Math.random() > 0.9);

  return {
    id: `POLE-${1000 + id}`,
    lat: 12.9716 + (Math.random() * 0.01), // Bangalore-ish coords
    lng: 77.5946 + (Math.random() * 0.01),
    status,
    batteryLevel,
    luxOutput,
    ambientLux: isNight ? Math.random() * 10 : 500,
    lastMotionMinutesAgo: hasMotion ? 0 : Math.floor(Math.random() * 60),
    hasDarkZoneRisk
  };
};

export const generatePoles = (count: number = 50): PoleData[] => {
  return Array.from({ length: count }, (_, i) => generateRandomPole(i));
};
