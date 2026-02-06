import React from 'react';
import { CareerPlanOutput } from '../types';

interface CareerPlanDisplayProps {
  plan: CareerPlanOutput;
  onReset: () => void;
}

const CareerPlanDisplay: React.FC<CareerPlanDisplayProps> = ({ plan, onReset }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-8">
        Your Personalized AI Career Plan
      </h2>

      <section className="mb-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          Career Recommendations
        </h3>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          {plan.career_recommendations.map((rec, index) => (
            <li key={index} className="pl-2">
              <span className="font-semibold text-gray-800">{rec.split(':')[0]}:</span> {rec.split(':').slice(1).join(':').trim()}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
          Action Steps
        </h3>
        <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
          {plan.action_steps.map((step, index) => (
            <li key={index} className="pl-2">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          Summary
        </h3>
        <p className="text-lg text-gray-800 leading-relaxed">
          {plan.summary}
        </p>
      </section>

      <div className="flex justify-center mt-8">
        <button
          onClick={onReset}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Plan Another Career Path
        </button>
      </div>
    </div>
  );
};

export default CareerPlanDisplay;