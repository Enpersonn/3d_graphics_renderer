import type { Vector3 } from "./types";

export class Rotate {
    private rotateY(p: Vector3, a: number): Vector3 {
        const c = Math.cos(a), s = Math.sin(a);
        return {
            x: p.x * c - p.z * s,
            y: p.y,
            z: p.x * s + p.z * c
        };
    }

    private rotateX(p: Vector3, a: number): Vector3 {
        const c = Math.cos(a), s = Math.sin(a);
        return {
            x: p.x,
            y: p.y * c - p.z * s,
            z: p.y * s + p.z * c
        };
    }

    private rotateZ(p: Vector3, a: number): Vector3 {
        const c = Math.cos(a), s = Math.sin(a);
        return {
            x: p.x * c - p.y * s,
            y: p.x * s + p.y * c,
            z: p.z
        };
    }

    public rotateEuler(p: Vector3, rot: Vector3): Vector3 {
        let q = p;
        q = this.rotateX(q, rot.x);
        q = this.rotateY(q, rot.y);
        q = this.rotateZ(q, rot.z);
        return q;
    }
}