import { FileText, Download, Eye, MoreVertical } from 'lucide-react';
import type { Document } from '../types';

interface DocumentCardProps {
    document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
    return (
        <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="h-6 w-6" />
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>

            <div>
                <h3 className="mb-1 font-semibold text-slate-900 line-clamp-1" title={document.title}>
                    {document.title}
                </h3>
                <p className="text-sm text-slate-500">
                    {document.type} • {document.year}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-xs font-medium text-slate-400">
                    {document.size}
                </span>
                <div className="flex items-center gap-2">
                    <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors" title="Preview">
                        <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors" title="Download">
                        <Download className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
