import { calculateMatrix4 } from 'features/calculations/matrix';
import type { Vector3, Vector4 } from "features/shared/classes/vector"
	;

export function rotateX(input: Vector4, a: number): Vector4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return calculateMatrix4(
		[
			[1, 0, 0, 0],
			[0, c, -s, 0],
			[0, s, c, 0],
			[0, 0, 0, 1],
		],
		input,
	);
}

export function rotateY(input: Vector4, a: number): Vector4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return calculateMatrix4(
		[
			[c, 0, s, 0],
			[0, 1, 0, 0],
			[-s, 0, c, 0],
			[0, 0, 0, 1],
		],
		input,
	);
}
export function rotateZ(input: Vector4, a: number): Vector4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return calculateMatrix4(
		[
			[c, -s, 0, 0],
			[s, c, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		],
		input,
	);
}

export function rotationMatrix(input: Vector4, angle: Vector3): Vector4 {
	const { x, y, z } = angle;
	const z_rotated = rotateZ(input, z);
	const y_rotated = rotateY(z_rotated, y);
	const x_rotated = rotateX(y_rotated, x);
	return x_rotated;
}
