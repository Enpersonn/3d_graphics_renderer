import { calculateMatrix4 } from 'features/calculations/matrix';
import type { Vector4 } from 'features/shared/vector';

export default function translationMatrix(input: Vector4) {
	return calculateMatrix4(
		[
			[1, 0, 0, input.x],
			[0, 1, 0, input.y],
			[0, 0, 1, input.z],
			[0, 0, 0, 1],
		],
		input,
	);
}
