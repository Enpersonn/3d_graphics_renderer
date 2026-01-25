import type { Vector3 } from "features/shared/classes/vector";
import type { Matrix4 } from "features/shared/types";

export default function translationMatrix(t: Vector3): Matrix4 {
	return [
		[1, 0, 0, t.x],
		[0, 1, 0, t.y],
		[0, 0, 1, t.z],
		[0, 0, 0, 1],
	];
}
