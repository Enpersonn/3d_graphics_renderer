import { crossProduct } from 'features/calculations/cross-product';
import { Vector3, type Vector4 } from 'features/shared/vector';
import { dotProduct } from './dot-product';

export function checkFace(v: Vector4[], p: Vector3): boolean {
	const a = new Vector3().add(v[0]);
	const b = new Vector3().add(v[1]);
	const c = new Vector3().add(v[2]);
	const normal = crossProduct(b.sub(a), c.sub(a));
	const dot = dotProduct(normal.toArray(), new Vector3().add(p).sub(a).toArray());

	return dot > 0;
}
