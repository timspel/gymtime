import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getMoreExercises } from "../services/openAi";
import type { Workout, Exercise } from "../interfaces/IWorkout";
import type { IMuscleGroup } from "../interfaces/IMuscleGroup";

import MuscleGroupFront from "./MuscleGroupFront";
import MuscleGroupBack from "./MuscleGroupBack";
import Button from "./Button";

interface GeneratedWorkoutProps {
  workoutPlan: Workout | undefined;
  onSave: (workout: Workout) => void;
  setWorkoutPlan?: (workout: Workout | undefined) => void;
}
function GeneratedWorkout({ workoutPlan, onSave, setWorkoutPlan }: GeneratedWorkoutProps) {
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (workoutPlan && workoutPlan.exercises) {
      setSelectedExercises(workoutPlan.exercises.map((_, index) => index));
    }
  }, [workoutPlan]);

  const displayMuscle = (exercise: Exercise) => {
    const muscleGroup: IMuscleGroup[] = exercise.muscles.map((muscle) => {
      return {
        name: muscle.muscle,
        activation: muscle.activation,
      };
    });
    return muscleGroup;
  };

  const handleToggleExercise = (index: number) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((selectedIndex) => selectedIndex !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const saveWorkout = () => {
    if (!workoutPlan) return;

    if (selectedExercises.length === 0) {
      toast.error("Please select at least one exercise to save the workout.");
      return;
    }

    const selectedExercisesList = workoutPlan.exercises.filter((_, i) =>
      selectedExercises.includes(i)
    );

    const workoutToSave: Workout = {
      ...workoutPlan,
      exercises: selectedExercisesList,
    };

    onSave(workoutToSave);
    toast.success("Workout saved!");
    setWorkoutPlan?.(undefined);
    setSelectedExercises([]);
  };

  const fetchMoreExercises = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.disabled = true; // Disable the button to prevent multiple clicks
    setLoading(true);
    const loadingToastId = toast.loading("Generating exercises...");

    const currentExercises = workoutPlan?.exercises.map(
      (exercise) => exercise.name
    ) || [];

    const exercises = await getMoreExercises(currentExercises);
    if (exercises && exercises.length > 0 && workoutPlan) {
      const updatedWorkoutPlan = {
        ...workoutPlan,
        exercises: [...workoutPlan.exercises, ...exercises],
      };
      setWorkoutPlan?.(updatedWorkoutPlan);
      setLoading(false);
      button.disabled = false;

      toast.success("More exercises added to the workout!", {
        id: loadingToastId,
      });
    } else {
      toast.error("No more exercises available.", {
        id: loadingToastId,
      });
    }
  }

  const discardWorkout = () => {
    setWorkoutPlan?.(undefined);
    setSelectedExercises([]);
    toast.success("Workout discarded.");
  };

  return (
    <div id="generated-workout" className="container w-full lg:col-span-2 max-w-2xl lg:max-w-full mx-auto rounded-xl overflow-hidden mt-10 shadow-lg mb-10">
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Generated Workout</h2>
      </div>

      {workoutPlan && (
        <div className="mx-auto bg-white  overflow-hidden w-full p-8">
          <h3 className="font-bold text-lg">{workoutPlan.title}</h3>
          <p className="mb-2"><i>{workoutPlan.workoutExplanation}</i></p>
          <p>Difficulty: {workoutPlan.difficulty}</p>
          <p>Duration: {workoutPlan.duration_minutes}</p>

          <h4>Exercises</h4>

          <div className="grid gap-4 pb-4 mt-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            {workoutPlan.exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex flex-row h-auto w-full p-4 rounded-lg shadow-lg items-start border border-zinc-100"
              >
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(index)}
                  onChange={() => handleToggleExercise(index)}
                  className="h-4 w-4 rounded m-4 accent-violet-500/25 "
                  aria-label={`Select exercise ${exercise.name}`}
                />
                <div className="flex flex-col w-1/2 gap-4 p-2">
                  <h5 className="font-semibold">
                    {index + 1} - {exercise.name}
                  </h5>
                  <div className="text-sm">
                    <p>{exercise.instructions}</p>
                  </div>
                  <ul className="gap-4">
                    <li>
                      {exercise.sets} sets x {exercise.reps} reps
                    </li>
                    <li>Rest: {exercise.rest_seconds} sec</li>
                  </ul>
                </div>

                <div className="flex flex-row p-2 h-full gap-2 w-1/2 rounded-lg mt-2 items-start justify-center bg-zinc-50 overflow-hidden">
                  <MuscleGroupFront
                    muscleActivations={displayMuscle(exercise)}
                  />
                  <MuscleGroupBack
                    muscleActivations={displayMuscle(exercise)}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-row h-auto w-full p-4 rounded-lg shadow-lg items-start border border-zinc-100">
              <div className="flex flex-col w-1/2 gap-4 p-2 h-full justify-between">
                <h5 className="font-semibold">
                  Not happy with the generated exercises?
                </h5>
                <p className="text-sm">
                  You can also generate more exercies by pressing the button.
                </p>
              </div>

              <div className="flex flex-col w-1/2 gap-4 p-2 h-full justify-between">
                <p className="text-sm">
                  You can modify the workout by selecting or deselecting exercises
                  above.
                </p>
                <button
                  className={`bg-gradient-to-r from-violet-500 to-blue-500 p-3 hover:cursor-pointer rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={fetchMoreExercises}
                >
                  {loading ? "Loading..." : "Generate More Exercises"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              className=" bg-gradient-to-r from-violet-500 to-blue-500 p-3 hover:cursor-pointer rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={saveWorkout}
            >
              Save Workout
            </Button>

            <Button onClick={discardWorkout} className="bg-red-500 p-3 rounded-xl text-white hover:cursor-pointer">
              Discard Workout
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
export default GeneratedWorkout;
