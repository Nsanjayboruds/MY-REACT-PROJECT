import * as THREE from "three";

// Axis-Aligned Bounding Box Collision Detection (AABB)
export const checkAABBCollision = (boxA, boxB) => {
  return (
    boxA.min.x <= boxB.max.x &&
    boxA.max.x >= boxB.min.x &&
    boxA.min.y <= boxB.max.y &&
    boxA.max.y >= boxB.min.y &&
    boxA.min.z <= boxB.max.z &&
    boxA.max.z >= boxB.min.z
  );
};

// Helper to create AABB from position and size
export const createBoundingBox = (position, size) => {
  const halfSize = size.clone().multiplyScalar(0.5);
  return new THREE.Box3(
    position.clone().sub(halfSize),
    position.clone().add(halfSize)
  );
};
