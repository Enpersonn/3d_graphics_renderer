import type { Object3D } from 'features/objects/types';
import { Vector3 } from '../shared/vector';

export class GameObject {
	public initialTransform = new Vector3(0, 0, 0);
	public initialRotation = new Vector3(0, 0, 0);
	public transform = this.initialTransform;
	public rotation = this.initialRotation;

	public faceColor;
	public showPoints: boolean = false;
	public object: Object3D;

	constructor(
		transform = { x: 0, y: 0, z: 0 },
		rotation = { x: 0, y: 0, z: 0 },
		object: Object3D,
		showPoints: boolean = false,
		faceColor: string = '#93f893',
	) {
		this.initialTransform = new Vector3(
			transform.x,
			transform.y,
			transform.z,
		);
		this.transform = this.initialTransform;
		this.initialRotation = new Vector3(rotation.x, rotation.y, rotation.z);
		this.rotation = this.initialRotation;
		this.object = object;
		this.showPoints = showPoints;
		this.faceColor = faceColor;
	}
}
