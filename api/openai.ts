import OpenAI from "openai";

// Import schemas
import workoutSchema from "../shared/schemas/workoutSchema.js";
import exerciseSchema from "../shared/schemas/exerciseSchema.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY missing on server" });

  try {
    const client = new OpenAI({ apiKey });

    const { kind, userGoal, currentExercises } = req.body || {};

    if (kind === "workoutPlan") {
      if (typeof userGoal !== "string" || !userGoal.trim()) {
        return res.status(400).json({ error: "userGoal must be a non-empty string" });
      }

      const response = new OpenAI({ apiKey }).responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are a personal trainer. You will help the user create a workout plan, make sure to include a sufficient amount of exercises to match the requested workout duration. You will only respond with the workout plan in valid JSON format as defined by the provided schema. Do not include any extra explanation or text."
          },
          { role: "user", content: userGoal }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "workout_schema",
            strict: true,
            schema: workoutSchema
          }
        }
      });

      const r = await response;
      return res.status(200).json({ workout: JSON.parse(r.output_text) });
    }

    if (kind === "moreExercises") {
      if (!Array.isArray(currentExercises) || currentExercises.some((x) => typeof x !== "string")) {
        return res.status(400).json({ error: "currentExercises must be string[]" });
      }

      const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are a personal trainer. You will help the user create a workout plan, make sure to include a sufficient amount of exercises to match the requested workout duration. You will only respond with the workout plan in valid JSON format as defined by the provided schema. Do not include any extra explanation or text."
          },
          {
            role: "user",
            content: `The user has already selected these exercises: ${currentExercises.join(
              ", "
            )}. Now the user wants more exercises within the same theme.`
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "exercise_schema",
            strict: true,
            schema: exerciseSchema
          }
        }
      });

      const parsed = JSON.parse(response.output_text);
      return res.status(200).json({ exercises: parsed.exercises });
    }

    return res.status(400).json({ error: "Invalid kind. Use 'workoutPlan' or 'moreExercises'." });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? String(err) });
  }
}