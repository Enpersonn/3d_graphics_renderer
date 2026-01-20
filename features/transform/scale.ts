import { calculateMatrix4 } from 'features/calculations/matrix';
import type { Vector3, Vector4 } from 'features/shared/vector';

export default function scaleMatrix(input: Vector4, t: Vector3): Vector4 {
    return calculateMatrix4(
        [
            [t.x, 0, 0, 0],
            [0, t.y, 0, 0],
            [0, 0, t.z, 0],
            [0, 0, 0, 1],
        ],
        input,
    );
}
