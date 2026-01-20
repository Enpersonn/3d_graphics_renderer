import type { Matrix4, NumberArray4 } from 'features/shared/types';
import { Vector4 } from 'features/shared/vector';
import { dotProduct } from './dot-product';

export function calculateMatrix4(mat: Matrix4, vec: Vector4): Vector4 {
    const q: NumberArray4 = [0, 0, 0, 0];

    mat.forEach((row, i) => {
        const dot = dotProduct(row, vec.toArray());
        q[i] = dot
    });
    const result = new Vector4(q)
    return result;
}
