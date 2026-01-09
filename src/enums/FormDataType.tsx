export type Goal = "strength" | "weight Loss" | "muscle Growth";
export type Experience = "beginner" | "intermediate" | "advanced";
export type Duration = "short" | "medium" | "long";
export type Equipment = "dumbbell" | "barbell" | "kettlebell" | "bodyweight" | "machine" | "band" | "cable-machine" | "all";
export type MuscleGroup = "chest" | "back" | "legs" | "arms" | "shoulders" | "core";

export interface FormData {
    goal: Goal;
    experience: Experience;
    duration: Duration;
    equipment: Equipment[];
    muscleGroup: MuscleGroup[];
}