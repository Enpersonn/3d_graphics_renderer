import { Vector3 } from 'features/shared/vector';

export class Translate {
	public translate(p: Vector3, t: Vector3) {
		return new Vector3(p.x + t.x, p.y + t.y, p.z + t.z);
	}
}
