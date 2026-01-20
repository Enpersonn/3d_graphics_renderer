import { Vector3, type Vector4 } from "features/shared/vector";

export default function calcTriangleCentorid(v: Vector4[]) {
    const [a, b, c] = v

    return new Vector3(
        (a.x + b.x + c.x) / 3,
        (a.y + b.y + c.y) / 3,
        (a.z + b.z + c.z) / 3,
    );
}