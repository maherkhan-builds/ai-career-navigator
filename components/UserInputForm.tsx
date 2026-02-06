import React, { useState } from 'react';
import { UserInput } from '../types';

interface UserInputFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [currentRole, setCurrentRole] = useState<string>('');
  const [currentIndustry, setCurrentIndustry] = useState<string>('');
  const [existingSkills, setExistingSkills] = useState<string>('');
  const [careerInterests, setCareerInterests] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole && currentIndustry && existingSkills && careerInterests) {
      onSubmit({ currentRole, currentIndustry, existingSkills, careerInterests });
    } else {
      alert('Please fill in all fields to get your personalized plan!');
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
        Your Career Profile
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
        Tell us about your current situation, skills, and aspirations to get a personalized AI-driven career path.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="currentRole" className="block text-gray-700 font-medium mb-2">
            Current Role
          </label>
          <input
            type="text"
            id="currentRole"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="e.g., Factory Worker, Data Entry Clerk"
            required
          />
        </div>

        <div>
          <label htmlFor="currentIndustry" className="block text-gray-700 font-medium mb-2">
            Current Industry
          </label>
          <input
            type="text"
            id="currentIndustry"
            value={currentIndustry}
            onChange={(e) => setCurrentIndustry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="e.g., Manufacturing, Administrative Services"
            required
          />
        </div>

        <div>
          <label htmlFor="existingSkills" className="block text-gray-700 font-medium mb-2">
            Existing Skills (comma-separated)
          </label>
          <textarea
            id="existingSkills"
            value={existingSkills}
            onChange={(e) => setExistingSkills(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
            placeholder="e.g., Machine operation, Inventory management, Customer service, Microsoft Office"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="careerInterests" className="block text-gray-700 font-medium mb-2">
            Career Interests (comma-separated)
          </label>
          <textarea
            id="careerInterests"
            value={careerInterests}
            onChange={(e) => setCareerInterests(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
            placeholder="e.g., Technology, Healthcare, Education, Creative Arts"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-300
            ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
        >
          {isLoading ? 'Generating Plan...' : 'Generate My Career Plan'}
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;