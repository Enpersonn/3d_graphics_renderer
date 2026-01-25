import { calculateMatrix4wMatrix4 } from "features/calculations/matrix";
import type { Vector3 } from "features/shared/classes/vector";
import type { Matrix4 } from "features/shared/types";

export function rotateX(a: number): Matrix4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return [
		[1, 0, 0, 0],
		[0, c, -s, 0],
		[0, s, c, 0],
		[0, 0, 0, 1],
	];
}

export function rotateY(a: number): Matrix4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return [
		[c, 0, s, 0],
		[0, 1, 0, 0],
		[-s, 0, c, 0],
		[0, 0, 0, 1],
	];
}
export function rotateZ(a: number): Matrix4 {
	const c = Math.cos(a),
		s = Math.sin(a);
	return [
		[c, -s, 0, 0],
		[s, c, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1],
	];
}

export function rotationMatrix(angle: Vector3): Matrix4 {
	const { x, y, z } = angle;
	const RZ = rotateZ(z);
	const RY = rotateY(y);
	const RX = rotateX(x);



	return calculateMatrix4wMatrix4(calculateMatrix4wMatrix4(RZ, RY), RX);
}
