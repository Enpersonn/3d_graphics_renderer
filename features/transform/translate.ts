import type { Vector3 } from 'features/shared/types';

export class Translate {
	public translate(p: Vector3, t: Vector3) {
		return {
			x: p.x + t.x,
			y: p.y + t.y,
			z: p.z + t.z,
		};
	}
}
