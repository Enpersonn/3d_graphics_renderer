import { Vector3, type Vector4 } from 'features/shared/vector';
import { dotProduct } from './dot-product';
import caluclateNormal from './normal';
import calcTriangleCentorid from './triangle-centroid';

export default function calculateLightAngle(f: Vector4[], l: Vector3): number {
    const p = calcTriangleCentorid(f);
    const normal = caluclateNormal(f);
    const ligtDir = new Vector3(l.x, l.y, l.z).sub(p);
    const cosTheta = dotProduct(normal.toArray(), ligtDir.toArray());


}
