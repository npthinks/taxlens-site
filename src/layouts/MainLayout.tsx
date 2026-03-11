import { FileText, Search, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { SourceDocument } from '../components/ChatInterface';

interface MainLayoutProps {
    children: React.ReactNode;
    usedDocuments?: SourceDocument[];
}

export function MainLayout({ children, usedDocuments = [] }: MainLayoutProps) {
    const [showDocsDropdown, setShowDocsDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDocsDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 relative">
                        <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>

                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDocsDropdown(!showDocsDropdown)}
                                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            >
                                Documents {usedDocuments.length > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">{usedDocuments.length}</span>}
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {showDocsDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50 max-h-[400px] overflow-y-auto">
                                    <h4 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-2">Used Documents</h4>
                                    {usedDocuments.length === 0 ? (
                                        <p className="px-3 py-4 text-sm text-slate-400 text-center">No documents have been used yet.</p>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {usedDocuments.map((doc, idx) => (
                                                <div key={idx} className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                                                    <div className="flex items-start gap-3">
                                                        <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800 line-clamp-1">{doc.metadata?.source || doc.metadata?.title || `Document ${idx + 1}`}</p>
                                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{doc.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

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
