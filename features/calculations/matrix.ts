import { Vector4 } from 'features/shared/classes/vector';
import type { Matrix4, NumberArray4 } from 'features/shared/types';
import { dotProduct } from './dot-product';

export function calculateMatrix4wVector4(
    mat: Matrix4,
    vec: NumberArray4,
): Vector4 {
    const q: NumberArray4 = [0, 0, 0, 0];

    mat.forEach((row, i) => {
        const dot = dotProduct(row, vec);
        q[i] = dot;
    });
    const result = new Vector4(q);
    return result;
}

const makeEmptyMatrix4 = (): Matrix4 => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

export function calculateMatrix4wMatrix4(
    mat1: Matrix4,
    mat2: Matrix4,
): Matrix4 {
    const q: Matrix4 = makeEmptyMatrix4();

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            q[row][col] =
                mat1[row][0] * mat2[0][col] +
                mat1[row][1] * mat2[1][col] +
                mat1[row][2] * mat2[2][col] +
                mat1[row][3] * mat2[3][col];
        }
    }

    return q;
}
