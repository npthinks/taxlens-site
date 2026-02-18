import { Search, Filter } from 'lucide-react';

export function SearchBar() {
    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search tax documents by name, year, or ID..."
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-base shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
                <button className="absolute right-3 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Filter className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
