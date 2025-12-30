import { Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center space-x-4">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-600">SYSTEM ONLINE</span>
                <span className="text-xs text-slate-400">| Last Sync: Just now</span>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-slate-100 rounded-full relative">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </header>
    );
};

export default Header;
