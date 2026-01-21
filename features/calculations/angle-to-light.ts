import { Vector3, type Vector4 } from 'features/shared/vector';
import { dotProduct } from './dot-product';
import caluclateNormal from './normal';
import calcTriangleCentorid from './triangle-centroid';

function normalize(v: Vector3): Vector3 {
    const len = Math.hypot(v.x, v.y, v.z) || 1;
    return new Vector3(v.x / len, v.y / len, v.z / len);
}

export default function calculateLightAngle(f: Vector4[], l: Vector3): number {
    const p = calcTriangleCentorid(f);
    const normal = normalize(caluclateNormal(f));
    const ligtDir = normalize(new Vector3(l.x, l.y, l.z).sub(p));
    const cosTheta = dotProduct(normal.toArray(), ligtDir.toArray());
    const diffuse = Math.max(0, cosTheta);
    return diffuse

}
