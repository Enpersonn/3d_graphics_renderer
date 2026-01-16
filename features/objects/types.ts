import type { Vector3 } from 'features/shared/vector';

export interface Object3D {
	vertices: Vector3[];
	faces: number[][];
}
