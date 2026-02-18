import { MainLayout } from './layouts/MainLayout';
import { ChatInterface } from './components/ChatInterface';

function App() {
    return (
        <MainLayout>
            <div className="flex flex-col gap-8 min-h-[calc(100vh-12rem)]">
                <section className="flex flex-col items-center gap-4 py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                        <span>✨ AI Power-Up</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Ask tax questions
                    </h1>
                    <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                        Get instant tax related information
                    </p>
                </section>

                <section className="flex-1 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <ChatInterface />
                </section>
            </div>
        </MainLayout>
    );
}

export default App;
