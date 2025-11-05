
import React, { useState } from 'react';
import { Test, TestType } from '../types';
import Card from './Card';
import Button from './Button';
import Select from './Select';
import Assessment from './Assessment';
import Results from './Results';
import { generateCareerRecommendations } from '../services/geminiService';

interface StudentViewProps {
  tests: Record<TestType, Test>;
}

type ViewState = 'selection' | 'assessment' | 'results';

const StudentView: React.FC<StudentViewProps> = ({ tests }) => {
  const [selectedTestType, setSelectedTestType] = useState<TestType>(TestType.Career);
  const [viewState, setViewState] = useState<ViewState>('selection');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTest = () => {
    setViewState('assessment');
    setError(null);
    setResults([]);
  };

  const handleTestSubmit = async (answers: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendations = await generateCareerRecommendations(
        selectedTestType,
        tests[selectedTestType].questions,
        answers
      );
      setResults(recommendations);
      setViewState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setViewState('assessment'); // Stay on assessment page to show error
    } finally {
      setIsLoading(false);
    }
  };
  
  const takeAnotherTest = () => {
      setViewState('selection');
      setResults([]);
      setError(null);
  }

  const renderContent = () => {
    switch (viewState) {
      case 'assessment':
        return (
          <Assessment
            test={tests[selectedTestType]}
            onSubmit={handleTestSubmit}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'results':
        return <Results recommendations={results} onReset={takeAnotherTest} />;
      case 'selection':
      default:
        return (
          <Card>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Take an Assessment</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Select an assessment to begin your journey of self-discovery and find career paths tailored to you.
            </p>
            <Select
              id="testType"
              label="Choose Assessment Type:"
              value={selectedTestType}
              onChange={(e) => setSelectedTestType(e.target.value as TestType)}
              options={Object.values(TestType).map(type => ({ value: type, label: tests[type].title }))}
            />
            <Button onClick={startTest} className="w-full mt-4">
              Start Test
            </Button>
          </Card>
        );
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
};

export default StudentView;
