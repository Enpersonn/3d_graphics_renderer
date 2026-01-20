import type { Object3D } from 'features/objects/types';
import { Vector3 } from '../shared/vector';

interface GameObjectProps {
	transform?: { x: number; y: number; z: number };
	rotation?: { x: number; y: number; z: number };
	object?: Object3D;
	showPoints?: boolean;
	faceColor?: string;
	rotationForce?: { x: number; y: number; z: number };
	transformForce?: { x: number; y: number; z: number };
}

export class GameObject {
	public initialTransform = new Vector3(0, 0, 0);
	public initialRotation = new Vector3(0, 0, 0);
	public transform = this.initialTransform;
	public rotation = this.initialRotation;

	public rotationForce = { x: 0, y: 0, z: 0 };
	public transformForce = { x: 0, y: 0, z: 0 };

	public faceColor: string = '#b4b4b4';
	public showPoints: boolean = false;
	public object?: Object3D;

	constructor({ transform, rotation, ...initialProps }: GameObjectProps) {
		Object.assign(this, initialProps);
		this.initialTransform.add(transform);
		this.initialRotation.add(rotation);
		this.transform = this.initialTransform;
		this.rotation = this.initialRotation;
	}
}
