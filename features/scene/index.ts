import type { GameObject } from 'features/objects/game-object';
import { Vector3 } from 'features/shared/vector';
import type { Renderer } from '../renderer';
import { Rotate } from '../transform/rotate';
import { Translate } from '../transform/translate';
import { Runtime } from './runtime';

export default class Scene {
	private CONSTANT_ROTATION = new Vector3(
		0.3 * Math.PI,
		0.2 * Math.PI,
		0.1 * Math.PI,
	);

	private CONSTANT_FORCE = new Vector3(0, 0, 0);

	private rotate = new Rotate();
	private translate = new Translate();

	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
	) {}

	frame = () => {
		const deltaTime = 1 / this.runtime.FPS;

		this.renderer.clear();

		this.gameObjects.forEach((gameObject) => {
			const { object, transform, rotation } = gameObject;
			const { faces, vertices } = object;

			transform.x += this.CONSTANT_FORCE.x * deltaTime;
			transform.y += this.CONSTANT_FORCE.y * deltaTime;
			transform.z += this.CONSTANT_FORCE.z * deltaTime;

			const newRotation = rotation.add(this.CONSTANT_ROTATION, deltaTime);

			faces.forEach((face, index: number) => {
				// TODO: Add Z-buffer
				this.renderer.drawFace(
					face.map((index) =>
						this.translate.translate(
							this.rotate.rotateEuler(
								vertices[index],
								newRotation,
							),
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
							this.rotate.rotateEuler(v, newRotation),
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
