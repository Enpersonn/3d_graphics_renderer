import { Vector3, type Vector4 } from 'features/shared/vector';
import { dotProduct } from './dot-product';
import caluclateNormal from './normal';

export function checkFace(v: Vector4[], p: Vector3): boolean {
	const normal = caluclateNormal(v);
	const dot = dotProduct(normal.toArray(), new Vector3().add(p).sub(v[0]).toArray());

	return dot > 0;
}
