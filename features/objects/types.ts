import type { Vector3 } from "features/shared/classes/vector";
import type Vertex from "features/shared/classes/vertex";

export interface Object3D {
	vertices: Vector3[];
	faces: number[][];
}


export interface Mesh {
	vertecies: Vertex[];

	indexBuffer: number[]
}