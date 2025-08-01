// Random number between two values
export const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Distance between two Vector3 points (for triggers)
export const distance3D = (a, b) => {
  return Math.sqrt(
    (a.x - b.x) ** 2 +
    (a.y - b.y) ** 2 +
    (a.z - b.z) ** 2
  );
};

// Clamp a value between min and max
export const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
