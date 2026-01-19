import { Vector3 } from 'features/shared/vector';

function rotateX(p: Vector3, a: number): Vector3 {
	const { x, y, z } = p;
	const c = Math.cos(a),
		s = Math.sin(a);
	return new Vector3(x, y * c - z * s, y * s + z * c);
}
function rotateY(p: Vector3, a: number): Vector3 {
	const { x, y, z } = p;
	const c = Math.cos(a),
		s = Math.sin(a);
	return new Vector3(x * c - z * s, y, x * s + z * c);
}

function rotateZ(p: Vector3, a: number): Vector3 {
	const { x, y, z } = p;
	const c = Math.cos(a),
		s = Math.sin(a);
	return new Vector3(x * c - y * s, x * s + y * c, z);
}

export function rotateEuler(p: Vector3, rot: Vector3): Vector3 {
	const { x, y, z } = rot;
	const x_rotated = rotateX(p, x);
	const y_rotated = rotateY(x_rotated, y);
	const z_rotated = rotateZ(y_rotated, z);
	return z_rotated;
}


export function rotationMatrix()