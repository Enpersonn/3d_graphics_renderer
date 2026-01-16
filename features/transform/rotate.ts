import type { Vector3 } from 'features/shared/types';

export class Rotate {
	private rotateX(p: Vector3, a: number): Vector3 {
		const { x, y, z } = p;
		const c = Math.cos(a),
			s = Math.sin(a);
		return {
			x: x,
			y: y * c - z * s,
			z: y * s + z * c,
		};
	}
	private rotateY(p: Vector3, a: number): Vector3 {
		const { x, y, z } = p;
		const c = Math.cos(a),
			s = Math.sin(a);
		return {
			x: x * c - z * s,
			y: y,
			z: x * s + z * c,
		};
	}

	private rotateZ(p: Vector3, a: number): Vector3 {
		const { x, y, z } = p;
		const c = Math.cos(a),
			s = Math.sin(a);
		return {
			x: x * c - y * s,
			y: x * s + y * c,
			z: z,
		};
	}

	public rotateEuler(p: Vector3, rot: Vector3): Vector3 {
		const { x, y, z } = rot;
		const x_rotated = this.rotateX(p, x);
		const y_rotated = this.rotateY(x_rotated, y);
		const z_rotated = this.rotateZ(y_rotated, z);
		return z_rotated;
	}
}
