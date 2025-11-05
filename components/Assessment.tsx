
import React, { useState } from 'react';
import { Test } from '../types';
import Card from './Card';
import Button from './Button';
import Spinner from './Spinner';

interface AssessmentProps {
  test: Test;
  onSubmit: (answers: Record<string, string>) => void;
  isLoading: boolean;
  error: string | null;
}

const Assessment: React.FC<AssessmentProps> = ({ test, onSubmit, isLoading, error }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };
  
  const allQuestionsAnswered = test.questions.every(q => answers[q.id]?.trim());

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-2">{test.title}</h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Answer the following questions to the best of your ability.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {test.questions.map((q, index) => (
          <div key={q.id}>
            <label htmlFor={q.id} className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">
              {index + 1}. {q.text}
            </label>
            <input
              id={q.id}
              type="text"
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder="Your answer here..."
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
        ))}
        
        {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
        
        <Button 
            type="submit" 
            className="w-full flex items-center justify-center" 
            disabled={isLoading || !allQuestionsAnswered}
        >
          {isLoading ? <><Spinner /> Submitting...</> : 'Submit & Get Recommendations'}
        </Button>
      </form>
    </Card>
  );
};

export default Assessment;
