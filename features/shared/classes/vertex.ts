import { Vector2, type Vector3 } from './vector';

export default class Vertex {
    public position: Vector3;
    public normal: Vector3;
    public uv: Vector2;

    constructor(pos: Vector3, normal: Vector3, uv?: Vector2) {
        this.position = pos;
        this.normal = normal;
        this.uv = uv ?? new Vector2();
    }
}
