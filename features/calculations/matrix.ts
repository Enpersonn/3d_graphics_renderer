import type { Matrix4 } from 'features/shared/types';
import type { Vector4 } from 'features/shared/vector';

export function calculateMatrix4(mat: Matrix4, vec: Vector4): Vector4 {
    mat.forEach(row => {
        vec.add(row);
    });
    return vec;
}
