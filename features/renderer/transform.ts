//MAINE FUNCTIONS (NOT AI COMMENTED)

import type { Vector2, Vector3 } from 'features/shared/types';

// converts world space to view space
const project = (point: Vector3) => {
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

const worldToScreen = (point: Vector3, game: HTMLCanvasElement) =>
	screen(project(point), game);

export { worldToScreen };
