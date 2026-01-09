import type {
  FormData,
  Equipment,
  MuscleGroup,
} from "../enums/FormDataType";

import { useState } from "react";

interface WorkoutFormProps {
  submitWorkout: (formData: FormData) => Promise<void>,
  loading?: boolean,
}

const WorkoutForm = ({ submitWorkout, loading }: WorkoutFormProps) => {
  const [formx, setFormx] = useState<FormData>({
    goal: "strength",
    experience: "beginner",
    duration: "short",
    equipment: [],
    muscleGroup: [],
  });

  const handeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormx((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (value === "all") {
      // If "all" are already checked, uncheck all other equipment options
      if (formx.equipment.includes("all") && checked) {
        setFormx((prevData) => ({
          ...prevData,
          equipment: [],
        }));
        return;
      }

      // If "all" is checked, select all equipment options
      setFormx((prevData) => ({
        ...prevData,
        equipment: checked ? ["dumbbell", "barbell", "kettlebell", "bodyweight", "machine", "band", "cable-machine", "all"] : [],
      }));
      return;
    }

    setFormx((prevData) => {
      const currentList = prevData.equipment;
      const updatedList = checked
        ? [...currentList, value as Equipment]
        : currentList.filter((equip) => equip !== value);

      return {
        ...prevData,
        equipment: updatedList,
      };
    });
  };
  const handleMuscleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormx((prevData) => {
      const currentList = prevData.muscleGroup;
      const updatedList = checked
        ? [...currentList, value as MuscleGroup]
        : currentList.filter((muscleGroup) => muscleGroup !== value);

      return {
        ...prevData,
        muscleGroup: updatedList,
      };
    });
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(formx);
    submitWorkout(formx);
    setFormx({
      goal: "strength",
      experience: "beginner",
      duration: "short",
      equipment: [],
      muscleGroup: [],
    });
  };

  const equipmentGroupOptions: Equipment[] = [
    "dumbbell",
    "barbell",
    "kettlebell",
    "bodyweight",
    "machine",
    "band",
    "cable-machine",
    "all"
  ];
  const muscleGroupOptions: MuscleGroup[] = [
    "chest",
    "back",
    "legs",
    "arms",
    "shoulders",
    "core",
  ];

  return (
    <div className="rounded-xl overflow-hidden mt-10 shadow-lg w-full max-w-2xl lg:max-w-full mx-auto">
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Create your workout</h2>
      </div>
      <form action="" className="mx-auto bg-white  overflow-hidden w-full p-8">
        {/* Goal */}
        <div className="mb-6">
          <label className="block font-medium">Goal</label>
          <select
            name="goal"
            id=""
            className="w-full border rounded px-3 py-2 "
            onChange={handeSelectChange}
            value={formx.goal}
          >
            <option value="strength">Strength</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-growth">Muscle Growth</option>
          </select>
        </div>

        {/*Experience  */}
        <div className="mb-6">
          <label className="">Experience</label>
          <select
            name="experience"
            id=""
            className="w-full border rounded px-3 py-2"
            onChange={handeSelectChange}
            value={formx.experience}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/*Duration */}
        <div className="mb-10">
          <label className="">Duration</label>
          <select
            name="duration"
            id=""
            className="w-full border rounded px-3 py-2"
            onChange={handeSelectChange}
            value={formx.duration}
          >
            <option value="30-45 min">Short</option>
            <option value="60-75 min">Medium</option>
            <option value="90+ min">Long</option>
          </select>
        </div>

        <hr className=" border-t border-gray-300" />

        <div className="justify-between gap-16 my-4 p-4  rounded-lg w-84 ">
          {/* Equipment */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Available Equipment
            </h3>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                {equipmentGroupOptions
                  .slice(0, Math.ceil(equipmentGroupOptions.length / 2))
                  .map((equipment) => (
                    <div key={equipment} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`equipment-${equipment}`}
                        name="equipment"
                        value={equipment}
                        checked={formx.equipment.includes(equipment)}
                        onChange={handleEquipmentChange}
                        className="h-4 w-4 accent-violet-500/25 rounded"
                      />
                      <label className="ml-2 capitalize">{equipment}</label>
                    </div>
                  ))}
              </div>

              <div className="space-y-2">
                {equipmentGroupOptions
                  .slice(Math.ceil(equipmentGroupOptions.length / 2))
                  .map((equipment) => (
                    <div key={equipment} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`equipment-${equipment}`}
                        name="equipment"
                        value={equipment}
                        checked={formx.equipment.includes(equipment)}
                        onChange={handleEquipmentChange}
                        className="h-4 w-4 accent-violet-500/25 rounded"
                      />
                      <label className="ml-2 capitalize">{equipment}</label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/*Muscle Groups  */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Focus Areas
            </h3>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                {muscleGroupOptions
                  .slice(0, Math.ceil(muscleGroupOptions.length / 2))
                  .map((muscle) => (
                    <div key={muscle} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`muscle-${muscle}`}
                        name="muscleGroup"
                        value={muscle}
                        checked={formx.muscleGroup.includes(muscle)}
                        onChange={handleMuscleGroupChange}
                        className="h-4 w-4 accent-violet-500/25 rounded "
                      />
                      <label
                        htmlFor={`muscle-${muscle}`}
                        className="ml-2 capitalize"
                      >
                        {muscle}
                      </label>
                    </div>
                  ))}
              </div>

              <div className="space-y-2">
                {muscleGroupOptions
                  .slice(Math.ceil(muscleGroupOptions.length / 2))
                  .map((muscle) => (
                    <div key={muscle} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`muscle-${muscle}`}
                        name="muscleGroup"
                        value={muscle}
                        checked={formx.muscleGroup.includes(muscle)}
                        onChange={handleMuscleGroupChange}
                        className="h-4 w-4 accent-violet-500/25 rounded"
                      />
                      <label
                        htmlFor={`muscle-${muscle}`}
                        className="ml-2 capitalize"
                      >
                        {muscle}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="bg-gradient-to-r from-violet-500 to-blue-500 p-3 hover:cursor-pointer rounded-xl text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={submitForm}
            disabled={loading}
          >
            Generate Workout Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
