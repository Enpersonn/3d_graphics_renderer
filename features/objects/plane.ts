import { Vector3 } from 'features/shared/vector';
import type { Object3D } from './types';
export class Plane implements Object3D {
	public vertices: Vector3[] = [
		new Vector3(0, 0, 0),
		new Vector3(0, 0, 8),
		new Vector3(8, 0, 8),
		new Vector3(8, 0, 0),
	];
	public faces: number[][] = [
		[0, 1, 2],
		[0, 2, 3],
	];
}
