export default class Vector2 {
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0,) {
        this.x = x;
        this.y = y;
    }

    public add(
        v?: Vector2 | { x: number; y: number; },
        s: number = 1,
    ): this {
        if (v === undefined) return this;
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }
    public sub(
        v: Vector2 | { x: number; y: number; },
        s: number = 1,
    ): this {
        this.x -= v.x * s;
        this.y -= v.y * s;
        return this;
    }

    public toArray() {
        return [this.x, this.y,]
    }
}