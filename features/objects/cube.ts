import type { Mesh, Object3D } from 'features/objects/types';
import { Vector3 } from 'features/shared/classes/vector';
import Vertex from 'features/shared/classes/vertex';

const vertices_old = [
	new Vector3(-0.5, -0.5, -0.5),
	new Vector3(-0.5, 0.5, -0.5),
	new Vector3(0.5, 0.5, -0.5),
	new Vector3(0.5, -0.5, -0.5),

	new Vector3(-0.5, -0.5, 0.5),
	new Vector3(-0.5, 0.5, 0.5),
	new Vector3(0.5, 0.5, 0.5),
	new Vector3(0.5, -0.5, 0.5),

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


const vertices = [
	// FRONT
	new Vertex(new Vector3(-0.5, -0.5, -0.5), new Vector3(0, 0, -1)),
	new Vertex(new Vector3(-0.5, 0.5, -0.5), new Vector3(0, 0, -1)),
	new Vertex(new Vector3(0.5, 0.5, -0.5), new Vector3(0, 0, -1)),
	new Vertex(new Vector3(0.5, -0.5, -0.5), new Vector3(0, 0, -1)),

	new Vertex(new Vector3(-0.5, -0.5, -0.5), new Vector3(0, -1, 0)),
	new Vertex(new Vector3(-0.5, 0.5, -0.5), new Vector3(0, 1, 0)),
	new Vertex(new Vector3(0.5, 0.5, -0.5), new Vector3(0, -1, 0)),
	new Vertex(new Vector3(0.5, -0.5, -0.5), new Vector3(0, 1, 0)),

	new Vertex(new Vector3(-0.5, -0.5, -0.5), new Vector3(-1, 0, 0)),
	new Vertex(new Vector3(-0.5, 0.5, -0.5), new Vector3(-1, 0, 0)),
	new Vertex(new Vector3(0.5, 0.5, -0.5), new Vector3(1, 0, 0)),
	new Vertex(new Vector3(0.5, -0.5, -0.5), new Vector3(1, 0, 0)),

	//BACK

	new Vertex(new Vector3(-0.5, -0.5, 0.5), new Vector3(0, 0, 1)),
	new Vertex(new Vector3(-0.5, 0.5, 0.5), new Vector3(0, 0, 1)),
	new Vertex(new Vector3(0.5, 0.5, 0.5), new Vector3(0, 0, 1)),
	new Vertex(new Vector3(0.5, -0.5, 0.5), new Vector3(0, 0, 1)),

	new Vertex(new Vector3(-0.5, -0.5, 0.5), new Vector3(0, -1, 0)),
	new Vertex(new Vector3(-0.5, 0.5, 0.5), new Vector3(0, 1, 0)),
	new Vertex(new Vector3(0.5, 0.5, 0.5), new Vector3(0, -1, 0)),
	new Vertex(new Vector3(0.5, -0.5, 0.5), new Vector3(0, 1, 0)),

	new Vertex(new Vector3(-0.5, -0.5, 0.5), new Vector3(-1, 0, 0)),
	new Vertex(new Vector3(-0.5, 0.5, 0.5), new Vector3(-1, 0, 0)),
	new Vertex(new Vector3(0.5, 0.5, 0.5), new Vector3(1, 0, 0)),
	new Vertex(new Vector3(0.5, -0.5, 0.5), new Vector3(1, 0, 0)),

];

const indexBuffer = [
	0, 1, 2,
	2, 3, 0,

	0, 4, 7,
	7, 3, 0,

	0, 4, 5,
	5, 1, 0,

	1, 5, 6,
	6, 2, 1,

	4, 5, 6,
	6, 7, 4,

	3, 2, 6,
	6, 7, 3

];

export class Cube_old implements Object3D {
	public faces = faces;
	public vertices = vertices_old;
}

export class Cube implements Mesh {

	public indexBuffer = indexBuffer;
	public vertecies = vertices;
}