//MAINE FUNCTIONS (NOT AI COMMENTED)

import type { Vector2 } from 'features/shared/types';
import type { Vector4 } from 'features/shared/vector';

// converts world space to view space
const project = (point: Vector4) => {
	return {
		x: point.x / point.z,
		y: point.y / point.z,
	};
};

// converts canvas origin to center
const screen = (p: Vector2, game: HTMLCanvasElement) => {
	return {
		x: ((p.x + 1) / 2) * game.width + 0.5,
		y: (1 - (p.y + 1) / 2) * game.height + 0.5,
	};
};

const worldToScreen = (point: Vector4, game: HTMLCanvasElement) =>
	screen(project(point), game);

export { worldToScreen };

