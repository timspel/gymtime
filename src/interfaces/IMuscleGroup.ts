export type ActivationLevel = "primary" | "secondary" | "tertiary";

export interface IMuscleGroup {
  name: string;
  activation: ActivationLevel;
}
