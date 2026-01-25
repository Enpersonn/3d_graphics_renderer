import type { NumberArray4 } from "features/shared/types";

export default class Vector4 {
    private valueArray: NumberArray4;
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 0;
    constructor(v?: NumberArray4) {
        this.valueArray = v ?? [0, 0, 0, 0];
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
    public multiply(
        v: Vector4 | NumberArray4,
    ): this {
        if (Array.isArray(v)) {
            this.valueArray = this.valueArray.map((value, index) => value * v[index]) as NumberArray4;
        } else {
            this.valueArray = this.valueArray.map((value, index) => value * v.valueArray[index]) as NumberArray4;
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


    public toArray() {
        return [
            this.x,
            this.y,
            this.z,
            this.w
        ]
    }
}