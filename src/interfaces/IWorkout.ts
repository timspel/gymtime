import { Muscles } from "../../shared/enums/MuscleEnum";

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Activation = "primary" | "secondary" | "tertiary";

export interface MuscleActivation {
  muscle: Muscles;
  activation: Activation;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  instructions: string;
  muscles: MuscleActivation[];
}

export interface Workout {
  title: string;
  workoutExplanation: string;
  duration_minutes: number;
  difficulty: Difficulty;
  exercises: Exercise[];
}
