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
	[0, 1, 2],
	[0, 2, 3],

	[4, 7, 6],
	[4, 6, 5],

	[0, 3, 7],
	[0, 7, 4],

	[1, 5, 6],
	[1, 6, 2],

	[0, 4, 5],
	[0, 5, 1],

	[2, 6, 7],
	[2, 7, 3],
];
export class Cube implements Object3D {
	public faces = faces;
	public vertices = vertices;
}
