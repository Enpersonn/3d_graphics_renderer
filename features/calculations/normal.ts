import { Vector3, type Vector4 } from "features/shared/classes/vector";
import { crossProduct } from './cross-product';

export default function caluclateNormal(v: Vector4[]): Vector3 {
    const a = new Vector3().add(v[0]);
    const b = new Vector3().add(v[1]);
    const c = new Vector3().add(v[2]);
    return crossProduct(b.sub(a), c.sub(a));
}
