import { FileText, Search, User } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            TaxLens
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Documents</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Reports</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Settings</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                            <Search className="h-4 w-4 text-slate-400" />
                            <span>Quick Search...</span>
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:px-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} TaxLens. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-600">Terms of Service</a>
                            <a href="#" className="hover:text-blue-600">Contact Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
