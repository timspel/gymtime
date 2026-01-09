import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import WorkoutForm from "./components/WorkoutForm";
import SavedWorkouts from "./components/SavedWorkouts";
import GeneratedWorkout from "./components/GeneratedWorkout";
import WorkoutApplicaton from "./components/WorkoutApplication";
import Header from "./components/Header";
import ContentContainer from "./components/ContentContainer";

import type { FormData } from "./enums/FormDataType";
import type { Workout } from "./interfaces/IWorkout";
import { getWorkoutPlan } from "./services/openAi";



function App() {
  const [workoutPlan, setWorkoutPlan] = useState<Workout>();
  const [loading, setLoading] = useState(false);

  const [savedWorkout, setSavedWorkout] = useState<Workout[]>([]);

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("savedWorkout");
    if (storedWorkouts) {
      setSavedWorkout(JSON.parse(storedWorkouts));
      console.log(
        "Loaded saved workouts from localStorage:",
        JSON.parse(storedWorkouts)
      );
    }
  }, []);

  useEffect(() => {
    if (savedWorkout.length > 0) {
      localStorage.setItem("savedWorkout", JSON.stringify(savedWorkout));
      console.log("Saved workouts updated:", savedWorkout);
    }
    else if (savedWorkout.length === 0) {
      localStorage.removeItem("savedWorkout");
      console.log("All workouts deleted, localStorage cleared.");
    }
  }, [savedWorkout]);

  const handleDeleteWorkout = (index: number) => {
    setSavedWorkout((prev) => prev.filter((_, i) => i !== index));
    toast.success("Workout deleted!");
  };

  const handleSavedWorkout = (workout: Workout) => {
    setSavedWorkout((prev) => [...prev, workout]);
    setTimeout(() => {
      const savedWorkoutElement = document.getElementById("saved-workout");
      if (savedWorkoutElement) {
        savedWorkoutElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const fetchWorkoutPlan = async (formData: FormData) => {
    console.log("Fetching workout plan with data:", formData);
    setLoading(true);
    const loadingToastId = toast.loading("Creating workout...");
    try {
      const workout = await getWorkoutPlan(JSON.stringify(formData));
      toast.success("Workout created successfully!", {
        id: loadingToastId,
      });
      setWorkoutPlan(workout);
      setLoading(false);
      setTimeout(() => {
        const generatedWorkoutElement =
          document.getElementById("generated-workout");
        if (generatedWorkoutElement) {
          generatedWorkoutElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      toast.error("Failed to create workout.", {
        id: loadingToastId,
      });
      console.error("Error creating workout:", error);
    }
  };

  return (
    <WorkoutApplicaton>
      <Toaster position="top-right" />

      {/* Header */}
      <Header />

      {/* content */}
      <ContentContainer>

        <WorkoutForm
          loading={loading}
          submitWorkout={fetchWorkoutPlan}
        />

        <SavedWorkouts
          savedWorkout={savedWorkout}
          onDelete={handleDeleteWorkout}
        />


        {workoutPlan && (
          <GeneratedWorkout
            workoutPlan={workoutPlan}
            onSave={handleSavedWorkout}
            setWorkoutPlan={setWorkoutPlan}
          />
        )}
      </ContentContainer>

    </WorkoutApplicaton>
  );
}

export default App;
