import type { Vector3 } from 'features/shared/vector';

export function dotProduct(a: Vector3, b: Vector3): number {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}
