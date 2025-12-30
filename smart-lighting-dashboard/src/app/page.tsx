'use client';

import { useEffect, useState } from 'react';
import { generatePoles, PoleData } from '@/lib/simulator';
import { Battery, Zap, AlertTriangle, Eye, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const [poles, setPoles] = useState<PoleData[]>([]);
  const [selectedPole, setSelectedPole] = useState<PoleData | null>(null);
  const [stats, setStats] = useState({ healthy: 0, fault: 0, saving: 0 });

  useEffect(() => {
    // Initial Load
    setPoles(generatePoles(50));

    // Simulation Loop (Refresh every 3 seconds)
    const interval = setInterval(() => {
      setPoles(current => current.map(p => {
        // Randomly update status of a few poles
        if (Math.random() > 0.9) {
          const isMotion = Math.random() > 0.7;
          return {
            ...p,
            luxOutput: isMotion ? 100 : 30,
            status: p.status === 'fault' ? 'fault' : (isMotion ? 'healthy' : 'dimmed'),
            lastMotionMinutesAgo: isMotion ? 0 : p.lastMotionMinutesAgo + 1
          };
        }
        return p;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const healthy = poles.filter(p => p.status === 'healthy' || p.status === 'dimmed').length;
    const fault = poles.filter(p => p.status === 'fault' || p.status === 'offline').length;
    const saving = poles.reduce((acc, p) => acc + (100 - p.luxOutput), 0) / poles.length;
    setStats({ healthy, fault, saving: Math.round(saving) });
  }, [poles]);

  return (
    <div className="p-6">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Total Active Poles</h3>
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-800">{stats.healthy} <span className="text-xs text-slate-400 font-normal">/ {poles.length}</span></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Critical Faults</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">{stats.fault}</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Grid Energy Saving</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">{stats.saving}%</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Dark Zones Risk</h3>
            <Eye className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600">{poles.filter(p => p.hasDarkZoneRisk).length}</div>
        </div>
      </div>

      <div className="flex space-x-6 h-[600px]">
        {/* MAP */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h2 className="text-lg font-bold mb-4 text-slate-700">Live Street View (Ward 12)</h2>
          <div className="flex-1 bg-slate-900 rounded-lg p-6 relative overflow-hidden">

            {/* Grid Simulation */}
            <div className="map-grid-container h-full w-full content-center justify-center">
              {poles.map(pole => (
                <button
                  key={pole.id}
                  onClick={() => setSelectedPole(pole)}
                  className={clsx(
                    "w-4 h-4 rounded-full transition-all duration-500 cursor-pointer hover:scale-150 transform",
                    pole.status === 'healthy' && "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]",
                    pole.status === 'dimmed' && "bg-yellow-600 opacity-50",
                    pole.status === 'fault' && "bg-red-500 animate-pulse",
                    pole.hasDarkZoneRisk && "border-2 border-orange-500",
                    selectedPole?.id === pole.id && "ring-2 ring-white scale-125"
                  )}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur p-3 rounded-lg text-xs text-white space-y-2">
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,1)]"></div><span>Active (Motion)</span></div>
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-yellow-600 opacity-50"></div><span>Dimmed (Idle)</span></div>
              <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span>Fault / Offline</span></div>
            </div>

          </div>
        </div>

        {/* DETAIL PANEL */}
        <div className="w-80 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold mb-6 text-slate-700">Device Details</h2>

          {selectedPole ? (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Pole ID</div>
                <div className="text-xl font-mono font-bold text-slate-800">{selectedPole.id}</div>
                <div className="mt-2 text-xs flex items-center space-x-2">
                  <div className={clsx("w-2 h-2 rounded-full", selectedPole.status === 'fault' ? 'bg-red-500' : 'bg-green-500')}></div>
                  <span className="capitalize text-slate-600">{selectedPole.status}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-600"><span>Battery Health</span> <span>{selectedPole.batteryLevel}%</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={clsx("h-full rounded-full", selectedPole.batteryLevel < 30 ? "bg-red-500" : "bg-green-500")} style={{ width: `${selectedPole.batteryLevel}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-600"><span>Current Output</span> <span>{selectedPole.luxOutput}%</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${selectedPole.luxOutput}%` }}></div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition-colors">
                  View Maintenance Log
                </button>
                <button className="w-full mt-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
              <Map className="w-10 h-10 mb-3 opacity-20" />
              Select a pole on the map to view live telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
