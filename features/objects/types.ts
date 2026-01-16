import type { Vector3 } from 'features/shared/types';

export interface Object3D {
	vertices: Vector3[];
	faces: number[][];
}
