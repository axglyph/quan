
import React from 'react';
import { QuantumNews } from '../types';

interface QuantumCardProps {
  news: QuantumNews;
}

const QuantumCard: React.FC<QuantumCardProps> = ({ news }) => {
  return (
    <div className="card-glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
          news.language === 'zh' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
        }`}>
          {news.language === 'zh' ? 'Chinese' : 'English'}
        </span>
        <span className="text-gray-500 text-xs">{news.date}</span>
      </div>
      
      <h3 className="text-lg font-bold mb-3 leading-tight text-white group-hover:text-blue-400 transition-colors">
        {news.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {news.summary}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
            {news.source?.charAt(0).toUpperCase() || 'Q'}
          </div>
          <span className="text-xs text-gray-300 truncate max-w-[100px]">{news.source}</span>
        </div>
        
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-2"
        >
          <span>Read More</span>
          <i className="fas fa-external-link-alt text-[10px]"></i>
        </a>
      </div>
    </div>
  );
};

export default QuantumCard;
