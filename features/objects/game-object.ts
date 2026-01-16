import type { Object3D } from 'features/objects/types';
import type { Vector3 } from '../shared/types';

export class GameObject {
	public initialTransform: Vector3 = { x: 0, y: 0, z: 0 };
	public initialRotation: Vector3 = { x: 0, y: 0, z: 0 };
	public transform: Vector3 = this.initialTransform;
	public rotation: Vector3 = this.initialRotation;

	public faceColor: string = '#93f893';
	public showPoints: boolean = false;
	public object: Object3D;

	constructor(
		transform: Vector3,
		rotation: Vector3,
		object: Object3D,
		showPoints: boolean = false,
	) {
		this.initialTransform = transform;
		this.transform = this.initialTransform;
		this.initialRotation = rotation;
		this.rotation = this.initialRotation;
		this.object = object;
		this.showPoints = showPoints;
	}
}
