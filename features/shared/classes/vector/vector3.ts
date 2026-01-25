export default class Vector3 {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(
        v?: Vector3 | { x: number; y: number; z: number },
        s: number = 1,
    ): this {
        if (v === undefined) return this;
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    }
    public sub(
        v: Vector3 | { x: number; y: number; z: number },
        s: number = 1,
    ): this {
        this.x -= v.x * s;
        this.y -= v.y * s;
        this.z -= v.z * s;
        return this;
    }

    public toArray() {
        return [
            this.x,
            this.y,
            this.z
        ]
    }
}