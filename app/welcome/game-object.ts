import type { Object3D } from "features/objects/types";
import type { Vector3 } from "./types";

export class GameObject {

    public initialTransform: Vector3 = { x: 0, y: 0, z: 0 };
    public initialRotation: Vector3 = { x: 0, y: 0, z: 0 };
    public transform: Vector3 = this.initialTransform;
    public rotation: Vector3 = this.initialRotation;

    public object: Object3D;

    constructor(transform: Vector3, rotation: Vector3, object: Object3D) {
        this.transform = transform;
        this.rotation = rotation;
        this.object = object;
    }



}