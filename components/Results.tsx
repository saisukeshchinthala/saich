
import React from 'react';
import Card from './Card';
import Button from './Button';

interface ResultsProps {
  recommendations: string[];
  onReset: () => void;
}

const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
);

const Results: React.FC<ResultsProps> = ({ recommendations, onReset }) => {
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Your Assessment Results</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Based on your answers, here are some career paths you might excel in:
        </p>
      </div>

      {recommendations.length > 0 ? (
        <ul className="space-y-4">
          {recommendations.map((rec, index) => {
            const [career, reason] = rec.split(/:\s(.+)/);
            return (
              <li key={index} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-emerald-500"/>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-700 dark:text-emerald-400">{career}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{reason}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-slate-500">No recommendations available at this time.</p>
      )}

      <Button onClick={onReset} className="w-full mt-8">
        Take Another Test
      </Button>
    </Card>
  );
};

export default Results;
