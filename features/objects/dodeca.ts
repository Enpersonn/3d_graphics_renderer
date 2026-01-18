import { Vector3 } from 'features/shared/vector';
import type { Object3D } from './types';

const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;

const points = [
	new Vector3(1, 1, 1),
	new Vector3(1, 1, -1),
	new Vector3(1, -1, 1),
	new Vector3(1, -1, -1),
	new Vector3(-1, 1, 1),
	new Vector3(-1, 1, -1),
	new Vector3(-1, -1, 1),
	new Vector3(-1, -1, -1),

	new Vector3(0, INV_PHI, PHI),
	new Vector3(0, INV_PHI, -PHI),
	new Vector3(0, -INV_PHI, PHI),
	new Vector3(0, -INV_PHI, -PHI),

	new Vector3(INV_PHI, PHI, 0),
	new Vector3(INV_PHI, -PHI, 0),
	new Vector3(-INV_PHI, PHI, 0),
	new Vector3(-INV_PHI, -PHI, 0),

	new Vector3(PHI, 0, INV_PHI),
	new Vector3(PHI, 0, -INV_PHI),
	new Vector3(-PHI, 0, INV_PHI),
	new Vector3(-PHI, 0, -INV_PHI),
];

const faces = [
	[0, 8, 10],
	[0, 10, 2],
	[0, 2, 16],

	[0, 16, 17],
	[0, 17, 1],
	[0, 1, 12],

	[0, 12, 14],
	[0, 14, 4],
	[0, 4, 8],

	[8, 4, 18],
	[8, 18, 6],
	[8, 6, 10],

	[10, 6, 15],
	[10, 15, 13],
	[10, 13, 2],

	[2, 13, 3],
	[2, 3, 17],
	[2, 17, 16],

	[1, 9, 11],
	[1, 11, 3],
	[1, 3, 17],

	[1, 12, 14],
	[1, 14, 5],
	[1, 5, 9],

	[9, 5, 19],
	[9, 19, 7],
	[9, 7, 11],

	[4, 14, 5],
	[4, 5, 19],
	[4, 19, 18],

	[6, 18, 19],
	[6, 19, 7],
	[6, 7, 15],
];

export class Dodeca implements Object3D {
	public faces = faces;
	public vertices = points;
}
