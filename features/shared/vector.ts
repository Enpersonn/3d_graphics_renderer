import type { NumberArray4 } from "./types";

export class Vector3 {
	public x: number;
	public y: number;
	public z: number;
	constructor(x: number = 0, y: number = 0, z: number = 0) {
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

export class Vector4 {
	private valueArray: NumberArray4
	public x: number = 0;
	public y: number = 0;
	public z: number = 0;
	public w: number = 0;
	constructor(v: NumberArray4) {
		this.valueArray = v;
		this.setValues();
	}

	private setValues() {
		const v = this.valueArray;
		this.x = v[0];
		this.y = v[1];
		this.z = v[2];
		this.w = v[3];
	}

	public add(
		v: Vector4 | NumberArray4,
		s: number = 1,
	): this {
		if (Array.isArray(v)) {
			this.valueArray = this.valueArray.map((value, index) => value + v[index] * s) as NumberArray4;
		} else {
			this.valueArray = this.valueArray.map((value, index) => value + v.valueArray[index] * s) as NumberArray4;
		}
		this.setValues();
		return this;
	}
	public sub(v: Vector4 | NumberArray4, s: number = 1): this {
		if (Array.isArray(v)) {
			this.valueArray = this.valueArray.map((value, index) => value - v[index] * s) as NumberArray4;
		} else {
			this.valueArray = this.valueArray.map((value, index) => value - v.valueArray[index] * s) as NumberArray4;
		}
		this.setValues();
		return this;
	}
}
