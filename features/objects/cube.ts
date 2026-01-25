import type { Mesh } from 'features/objects/types';
import { Vector3 } from 'features/shared/classes/vector';
import Vertex from 'features/shared/classes/vertex';

const v = (x: number, y: number, z: number, nx: number, ny: number, nz: number) =>
	new Vertex(new Vector3(x, y, z), new Vector3(nx, ny, nz));

// 24 vertices: 6 faces * 4 verts each
const vertices: Vertex[] = [
	// -Z (front, z = -0.5)
	v(-0.5, -0.5, -0.5, 0, 0, -1),
	v(-0.5, 0.5, -0.5, 0, 0, -1),
	v(0.5, 0.5, -0.5, 0, 0, -1),
	v(0.5, -0.5, -0.5, 0, 0, -1),

	// +Z (back, z = +0.5)
	v(-0.5, -0.5, 0.5, 0, 0, 1),
	v(0.5, -0.5, 0.5, 0, 0, 1),
	v(0.5, 0.5, 0.5, 0, 0, 1),
	v(-0.5, 0.5, 0.5, 0, 0, 1),

	// -X (left, x = -0.5)
	v(-0.5, -0.5, 0.5, -1, 0, 0),
	v(-0.5, 0.5, 0.5, -1, 0, 0),
	v(-0.5, 0.5, -0.5, -1, 0, 0),
	v(-0.5, -0.5, -0.5, -1, 0, 0),

	// +X (right, x = +0.5)
	v(0.5, -0.5, -0.5, 1, 0, 0),
	v(0.5, 0.5, -0.5, 1, 0, 0),
	v(0.5, 0.5, 0.5, 1, 0, 0),
	v(0.5, -0.5, 0.5, 1, 0, 0),

	// -Y (bottom, y = -0.5)
	v(-0.5, -0.5, 0.5, 0, -1, 0),
	v(-0.5, -0.5, -0.5, 0, -1, 0),
	v(0.5, -0.5, -0.5, 0, -1, 0),
	v(0.5, -0.5, 0.5, 0, -1, 0),

	// +Y (top, y = +0.5)
	v(-0.5, 0.5, -0.5, 0, 1, 0),
	v(-0.5, 0.5, 0.5, 0, 1, 0),
	v(0.5, 0.5, 0.5, 0, 1, 0),
	v(0.5, 0.5, -0.5, 0, 1, 0),
];

// 36 indices. Each face uses its own 4 verts.
// Winding here is CW when looking at the outside of each face.
const indexBuffer: number[] = [
	// -Z
	0, 1, 2,
	0, 2, 3,
	// +Z
	4, 5, 6,
	4, 6, 7,
	// -X
	8, 9, 10,
	8, 10, 11,
	// +X
	12, 13, 14,
	12, 14, 15,
	// -Y
	16, 17, 18,
	16, 18, 19,
	// +Y
	20, 21, 22,
	20, 22, 23,
];

export class Cube implements Mesh {
	public vertices = vertices;
	public indexBuffer = indexBuffer;
}
