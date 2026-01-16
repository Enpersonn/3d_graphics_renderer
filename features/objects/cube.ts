import type { Object3D } from 'features/objects/types';
import { Vector3 } from 'features/shared/vector';

const vertices = [
	new Vector3(0.5, 0.5, 0.5),
	new Vector3(-0.5, 0.5, 0.5),
	new Vector3(-0.5, -0.5, 0.5),
	new Vector3(0.5, -0.5, 0.5),

	new Vector3(0.5, 0.5, -0.5),
	new Vector3(-0.5, 0.5, -0.5),
	new Vector3(-0.5, -0.5, -0.5),
	new Vector3(0.5, -0.5, -0.5),
];

const faces = [
	[5, 6, 2],
	[5, 2, 1],
	[5, 1, 0],
	[5, 0, 4],

	[6, 5, 4],
	[6, 5, 4],
	[6, 4, 7],
	[6, 7, 3],
	[6, 3, 2],

	[7, 4, 0],
	[7, 0, 3],

	[3, 2, 1],
	[3, 1, 0],
];

export class Cube implements Object3D {
	public faces = faces;
	public vertices = vertices;
}
