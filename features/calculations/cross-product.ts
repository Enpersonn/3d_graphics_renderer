import { Vector3 } from 'features/shared/vector';

export function crossProduct(a: Vector3, b: Vector3): Vector3 {
	return new Vector3(
		a.y * b.z - a.z * b.y,
		a.z * b.x - a.x * b.z,
		a.x * b.y - a.y * b.x,
	);
}
