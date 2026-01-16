import type { GameObject } from 'features/objects/game-object';
import type { Renderer } from '../renderer';
import { Rotate } from '../transform/rotate';
import { Translate } from '../transform/translate';
import { Runtime } from './runtime';

export default class Scene {
	private CONSTANT_ROTATION = {
		x: 0.3 * Math.PI,
		y: 0.2 * Math.PI,
		z: 0.1 * Math.PI,
	};

	private CONSTANT_FORCE = {
		x: 0,
		y: 0,
		z: 0,
	};

	private rotate = new Rotate();
	private translate = new Translate();

	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
	) {}

	frame = () => {
		const deltaTime = 1 / this.runtime.FPS;

		this.renderer.clear();

		// Cube.faces.forEach((face) => {
		// 	for (let i = 0; i < face.length; i++) {
		// 		const pointA = Cube.points[face[i]];
		// 		const pointB = Cube.points[face[(i + 1) % face.length]];
		// 		this.renderer.drawLine(
		// 			this.translate(this.rotate.rotateEuler(pointA, this.rotation)),
		// 			this.translate(this.rotate.rotateEuler(pointB, this.rotation)),
		// 		);
		// 	}
		// });
		this.gameObjects.forEach((gameObject) => {
			const { object, transform, rotation } = gameObject;
			const { faces, vertices } = object;

			transform.x += this.CONSTANT_FORCE.x * deltaTime;
			transform.y += this.CONSTANT_FORCE.y * deltaTime;
			transform.z += this.CONSTANT_FORCE.z * deltaTime;

			rotation.x += this.CONSTANT_ROTATION.x * deltaTime;
			rotation.y += this.CONSTANT_ROTATION.y * deltaTime;
			rotation.z += this.CONSTANT_ROTATION.z * deltaTime;

			faces.forEach((face, index: number) => {
				// TODO: Add Z-buffer
				this.renderer.drawFace(
					face.map((index) =>
						this.translate.translate(
							this.rotate.rotateEuler(vertices[index], rotation),
							gameObject.transform,
						),
					),
					index,
				);
			});
			if (gameObject.showPoints) {
				vertices.forEach((v, index: number) => {
					this.renderer.drawPoint(
						this.translate.translate(
							this.rotate.rotateEuler(v, rotation),
							gameObject.transform,
						),
						index,
					);
				});
			}
		});
	};

	private runtime = new Runtime(this.frame);

	run = this.runtime.run;
	stop = this.runtime.stop;
	reset = () =>
		this.runtime.reset(
			this.gameObjects.map(
				(gameObject) => [
					gameObject.initialTransform,
					gameObject.transform,
				],
				this.gameObjects.map((gameObject) => [
					gameObject.initialRotation,
					gameObject.rotation,
				]),
			),
		);
}
