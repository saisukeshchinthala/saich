
import React, { useState } from 'react';
import { Role, Test, TestType } from './types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';

const initialTests: Record<TestType, Test> = {
  [TestType.Career]: {
    title: 'Career Test',
    questions: [
      { id: 'c1', text: 'Do you enjoy leading a team to achieve a common goal?' },
      { id: 'c2', text: 'Are you more comfortable with abstract ideas or concrete tasks?' },
      { id: 'c3', text: 'Does solving complex, analytical problems energize you?' },
    ],
  },
  [TestType.Personality]: {
    title: 'Personality Test',
    questions: [
      { id: 'p1', text: 'When faced with a difficult decision, do you rely more on logic or your gut feeling?' },
      { id: 'p2', text: 'Do you prefer a structured, predictable work environment or a flexible, dynamic one?' },
      { id: 'p3', text: 'Are you energized by social interactions or do you recharge through solitude?' },
    ],
  },
  [TestType.Skills]: {
    title: 'Skills Evaluation',
    questions: [
      { id: 's1', text: 'On a scale of 1-5, how would you rate your public speaking and presentation skills?' },
      { id: 's2', text: 'On a scale of 1-5, how proficient are you with data analysis tools like Excel or Python?' },
      { id: 's3', text: 'On a scale of 1-5, how would you rate your ability to creatively solve unexpected problems?' },
    ],
  },
};

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>(Role.Student);
  const [tests, setTests] = useState(initialTests);

  const addQuestion = (testType: TestType, questionText: string) => {
    if (!questionText.trim()) return;
    setTests((prevTests) => {
      const newQuestion = { id: `q${Date.now()}`, text: questionText };
      const updatedQuestions = [...prevTests[testType].questions, newQuestion];
      return {
        ...prevTests,
        [testType]: { ...prevTests[testType], questions: updatedQuestions },
      };
    });
  };

  const removeQuestion = (testType: TestType, questionId: string) => {
    setTests((prevTests) => {
      const updatedQuestions = prevTests[testType].questions.filter(
        (q) => q.id !== questionId
      );
      return {
        ...prevTests,
        [testType]: { ...prevTests[testType], questions: updatedQuestions },
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Navigation currentRole={currentRole} setCurrentRole={setCurrentRole} />
        <div className="mt-6">
          {currentRole === Role.Student ? (
            <StudentView tests={tests} />
          ) : (
            <AdminView
              tests={tests}
              addQuestion={addQuestion}
              removeQuestion={removeQuestion}
            />
          )}
        </div>
      </main>
       <footer className="text-center p-4 text-xs text-slate-500">
        <p>Powered by Gemini. Designed for educational purposes.</p>
      </footer>
    </div>
  );
};

export default App;
