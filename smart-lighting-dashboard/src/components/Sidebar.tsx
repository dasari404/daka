import Link from 'next/link';
import { LayoutDashboard, Map, BarChart3, Bell, Settings, Zap } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-700">
            <div className="p-6 flex items-center space-x-2 border-b border-slate-700">
                <Zap className="text-yellow-400 w-8 h-8" />
                <span className="text-xl font-bold tracking-wider">LUMI<span className="text-yellow-400">SMART</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/" className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg text-yellow-400">
                    <Map className="w-5 h-5" />
                    <span>Live Map</span>
                </Link>
                <Link href="/analytics" className="flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors">
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                </Link>
                <Link href="/alerts" className="flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span>Alerts</span>
                </Link>
                <Link href="/settings" className="flex items-center space-x-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
                System v1.0.0
            </div>
        </div>
    );
};

export default Sidebar;
