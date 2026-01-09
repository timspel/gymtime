import { Muscles } from "../enums/MuscleEnum";

const exerciseSchema = {
  type: "object",
  properties: {
    exercises: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          sets: { type: "integer" },
          reps: { type: "integer" },
          rest_seconds: { type: "integer" },
          instructions: { type: "string" },
          muscles: {
            type: "array",
            items: {
              type: "object",
              properties: {
                muscle: { type: "string", enum: Object.values(Muscles) },
                activation: {
                  type: "string",
                  enum: ["primary", "secondary", "tertiary"],
                },
              },
              required: ["muscle", "activation"],
              additionalProperties: false,
            },
          },
        },
        required: [
          "name",
          "sets",
          "reps",
          "rest_seconds",
          "instructions",
          "muscles",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["exercises"],
  additionalProperties: false,
};

export default exerciseSchema;
