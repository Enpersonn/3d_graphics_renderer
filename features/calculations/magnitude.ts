import type { Vector3 } from "features/shared/vector";


export function magnitude(v: Vector3) {
    return Math.sqrt((v.x * v.x) + (v.y * v.y) + (v.z * v.z))
}