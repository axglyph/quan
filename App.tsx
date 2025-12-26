
import React, { useState, useEffect, useCallback } from 'react';
import { fetchQuantumTrends } from './services/geminiService';
import { QuantumNews, FetchState } from './types';
import QuantumCard from './components/QuantumCard';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [zhNews, setZhNews] = useState<QuantumNews[]>([]);
  const [enNews, setEnNews] = useState<QuantumNews[]>([]);
  const [state, setState] = useState<FetchState>({
    loading: true,
    error: null,
    lastUpdated: null
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Fetch both in parallel
      const [zhResults, enResults] = await Promise.all([
        fetchQuantumTrends('zh'),
        fetchQuantumTrends('en')
      ]);
      
      setZhNews(zhResults);
      setEnNews(enResults);
      setState({
        loading: false,
        error: null,
        lastUpdated: new Date().toLocaleTimeString()
      });
    } catch (err: any) {
      setState({
        loading: false,
        error: "Failed to fetch latest quantum pulse. Please verify your API key configuration.",
        lastUpdated: null
      });
    }
  }, []);

  useEffect(() => {
    loadData();
    // Refresh every 30 minutes
    const interval = setInterval(loadData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <div className="min-h-screen quantum-gradient flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-atom text-white text-xl animate-pulse"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">QuantumPulse</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">Global Tech Scraper</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {state.lastUpdated && (
              <span className="hidden md:block text-xs text-gray-500 italic">
                Last updated: {state.lastUpdated}
              </span>
            )}
            <button 
              onClick={loadData}
              disabled={state.loading}
              className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white disabled:opacity-50"
            >
              <i className={`fas fa-sync-alt ${state.loading ? 'animate-spin' : ''}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          The Frontier of Physics
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          Scraping the hottest global trends in quantum technology using real-time grounding.
          Insights from both Chinese and International research centers.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {state.error ? (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-exclamation-triangle text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Observation Failed</h3>
            <p className="text-gray-400 mb-6">{state.error}</p>
            <button 
              onClick={loadData}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : state.loading ? (
          <Loader />
        ) : (
          <div className="space-y-16">
            {/* Chinese News */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <span className="w-8 h-1 bg-red-500 rounded-full"></span>
                  <span>量子科技 (中文热度排行)</span>
                </h2>
                <div className="h-[1px] flex-grow bg-white/5"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {zhNews.map((news) => (
                  <QuantumCard key={news.id} news={news} />
                ))}
              </div>
            </div>

            {/* English News */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                  <span>Quantum Tech (Trending English)</span>
                </h2>
                <div className="h-[1px] flex-grow bg-white/5"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {enNews.map((news) => (
                  <QuantumCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} QuantumPulse. Powered by Gemini-3-Flash & Vercel.</p>
        <p className="mt-2 text-xs">Observing the macroscopic through microscopic breakthroughs.</p>
      </footer>
    </div>
  );
};

export default App;
