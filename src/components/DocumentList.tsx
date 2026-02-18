import { DocumentCard } from './DocumentCard';
import type { Document } from '../types';

interface DocumentListProps {
    documents: Document[];
    title?: string;
}

export function DocumentList({ documents, title = "Recent Documents" }: DocumentListProps) {
    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All
                </button>
            </div>

            {documents.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                    <p className="text-slate-500">No documents found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {documents.map((doc) => (
                        <DocumentCard key={doc.id} document={doc} />
                    ))}
                </div>
            )}
        </div>
    );
}
