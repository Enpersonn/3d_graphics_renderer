import type { Object3D } from './types';

const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;

const points = [
	{ x: 1, y: 1, z: 1 },
	{ x: 1, y: 1, z: -1 },
	{ x: 1, y: -1, z: 1 },
	{ x: 1, y: -1, z: -1 },
	{ x: -1, y: 1, z: 1 },
	{ x: -1, y: 1, z: -1 },
	{ x: -1, y: -1, z: 1 },
	{ x: -1, y: -1, z: -1 },

	{ x: 0, y: INV_PHI, z: PHI },
	{ x: 0, y: INV_PHI, z: -PHI },
	{ x: 0, y: -INV_PHI, z: PHI },
	{ x: 0, y: -INV_PHI, z: -PHI },

	{ x: INV_PHI, y: PHI, z: 0 },
	{ x: INV_PHI, y: -PHI, z: 0 },
	{ x: -INV_PHI, y: PHI, z: 0 },
	{ x: -INV_PHI, y: -PHI, z: 0 },

	{ x: PHI, y: 0, z: INV_PHI },
	{ x: PHI, y: 0, z: -INV_PHI },
	{ x: -PHI, y: 0, z: INV_PHI },
	{ x: -PHI, y: 0, z: -INV_PHI },
];

const faces = [
	[0, 8, 10, 2, 16],
	[0, 16, 17, 1, 12],
	[0, 12, 14, 4, 8],

	[8, 4, 18, 6, 10],
	[10, 6, 15, 13, 2],
	[2, 13, 3, 17, 16],

	[1, 9, 11, 3, 17],
	[1, 12, 14, 5, 9],
	[9, 5, 19, 7, 11],

	[4, 14, 5, 19, 18],
	[6, 18, 19, 7, 15],
];

export class Dodeca implements Object3D {
	public faces = faces;
	public vertices = points;
}
