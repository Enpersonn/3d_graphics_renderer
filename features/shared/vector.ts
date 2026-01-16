export class Vector3 {
	constructor(
		public x: number,
		public y: number,
		public z: number,
	) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public add(
		v: Vector3 | { x: number; y: number; z: number },
		s: number = 1,
	): this {
		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		return this;
	}
	public sub(
		v: Vector3 | { x: number; y: number; z: number },
		s: number = 1,
	): this {
		this.x -= v.x * s;
		this.y -= v.y * s;
		this.z -= v.z * s;
		return this;
	}
}
