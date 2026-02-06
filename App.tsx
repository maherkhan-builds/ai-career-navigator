import React, { useState, useCallback } from 'react';
import UserInputForm from './components/UserInputForm';
import CareerPlanDisplay from './components/CareerPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { UserInput, CareerPlanOutput } from './types';
import { generateCareerPlan } from './services/geminiService';

const App: React.FC = () => {
  const [careerPlan, setCareerPlan] = useState<CareerPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setCareerPlan(null); // Clear previous plan
    try {
      const plan = await generateCareerPlan(input);
      if (plan) {
        setCareerPlan(plan);
      } else {
        setError('No career plan was generated. Please try again with different inputs.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while generating the plan.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this function is created once

  const handleReset = useCallback(() => {
    setCareerPlan(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 leading-tight">
          AI Career Navigator
        </h1>
        <p className="mt-3 text-lg md:text-xl text-blue-700 max-w-2xl mx-auto">
          Shape your future in an AI-driven world. Get personalized career paths and reskilling recommendations.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && !careerPlan && (
          <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
        )}

        {!isLoading && careerPlan && (
          <CareerPlanDisplay plan={careerPlan} onReset={handleReset} />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Career Navigator. All rights reserved.</p>
        <p>Adheres to labor market standards and privacy requirements.</p>
      </footer>
    </div>
  );
};

export default App;