import type { Exercise, Workout } from "../interfaces/IWorkout";

export async function getWorkoutPlan(userGoal: string) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "workoutPlan", userGoal })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to get workout plan");

  return data.workout as Workout;
}

export async function getMoreExercises(currentExercises: string[]) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "moreExercises", currentExercises })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Failed to get more exercises");

  return data.exercises as Exercise[];
}