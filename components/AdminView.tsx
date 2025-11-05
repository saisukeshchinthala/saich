
import React, { useState } from 'react';
import { Test, TestType } from '../types';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Select from './Select';

interface AdminViewProps {
  tests: Record<TestType, Test>;
  addQuestion: (testType: TestType, questionText: string) => void;
  removeQuestion: (testType: TestType, questionId: string) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const AdminView: React.FC<AdminViewProps> = ({ tests, addQuestion, removeQuestion }) => {
  const [selectedTestType, setSelectedTestType] = useState<TestType>(TestType.Career);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    addQuestion(selectedTestType, newQuestion);
    setNewQuestion('');
  };

  const currentTest = tests[selectedTestType];

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Manage Assessments</h2>
        <div className="space-y-4">
          <Select
            id="adminTestType"
            label="Select Test to Manage:"
            value={selectedTestType}
            onChange={(e) => setSelectedTestType(e.target.value as TestType)}
            options={Object.values(TestType).map(type => ({ value: type, label: tests[type].title }))}
          />
          <Input
            id="newQuestion"
            label="New Question:"
            type="text"
            placeholder="Enter new question text..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button onClick={handleAddQuestion} className="w-full">
            Add Question
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          Current Questions for "{currentTest.title}"
        </h3>
        {currentTest.questions.length > 0 ? (
          <ul className="space-y-3">
            {currentTest.questions.map((q) => (
              <li key={q.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="text-slate-700 dark:text-slate-300 mr-4">{q.text}</span>
                <button
                  onClick={() => removeQuestion(selectedTestType, q.id)}
                  className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors duration-200"
                  aria-label={`Remove question: ${q.text}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center py-4">No questions found for this test.</p>
        )}
      </Card>
    </div>
  );
};

export default AdminView;

