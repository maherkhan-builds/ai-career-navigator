export interface UserInput {
  currentRole: string;
  currentIndustry: string;
  existingSkills: string;
  careerInterests: string;
}

export interface CareerPlanOutput {
  career_recommendations: string[];
  action_steps: string[];
  summary: string;
}