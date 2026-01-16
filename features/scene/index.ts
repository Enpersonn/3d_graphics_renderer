import type { GameObject } from 'features/objects/game-object';
import type { Vector3 } from 'features/shared/vector';
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

	private CONSTANT_FORCE = { x: 0, y: 0, z: 0 };

	private rotate = new Rotate();
	private translate = new Translate();

	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
	) {}

	frame = (deltaTime: number) => {
		this.renderer.clear();

		this.gameObjects.forEach((gameObject) => {
			const { object, transform, rotation } = gameObject;
			const { faces, vertices } = object;

			transform.add(this.CONSTANT_FORCE, deltaTime);
			rotation.add(this.CONSTANT_ROTATION, deltaTime);

			faces.forEach((face, index: number) => {
				// TODO: Add Culling afterwards painters algorithm
				this.renderer.drawFace(
					face.map((index) =>
						this.translate.translate(
							this.rotate.rotateEuler(vertices[index], rotation),
							gameObject.transform,
						),
					),
					index,
					gameObject.faceColor,
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
	reset = () => {
		const pairs: [Vector3, Vector3][] = [];
		this.gameObjects.forEach((go) => {
			pairs.push([go.initialTransform, go.transform]);
			pairs.push([go.initialRotation, go.rotation]);
		});
		this.runtime.reset(pairs);
	};
}
