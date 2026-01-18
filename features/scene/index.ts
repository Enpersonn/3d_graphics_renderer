import { checkFace } from 'features/calculations/check-face';
import type { GameObject } from 'features/objects/game-object';
import { Vector3 } from 'features/shared/vector';
import type { Renderer } from '../renderer';
import { Rotate } from '../transform/rotate';
import { Translate } from '../transform/translate';
import { Runtime } from './runtime';

export default class Scene {
	private rotate = new Rotate();
	private translate = new Translate();

	private viewPosition = new Vector3(0, 0, 0);

	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
	) {}

	frame = (deltaTime: number) => {
		this.renderer.clear();
		this.renderer.renderSkyBox(this.viewPosition);

		// NOT PERMENANT SOLUTION. Just to have basic depth sorting.
		// TODO: Implement proper depth sorting. Painter's algorithm: (https://en.wikipedia.org/wiki/Painter%27s_algorithm)
		const sortedGameObjects = this.gameObjects.sort((a, b) => {
			const aZdistance = a.transform.z - this.viewPosition.z;
			const bZdistance = b.transform.z - this.viewPosition.z;
			return bZdistance - aZdistance;
		});

		// TODO: Start of painters algorithm
		// Instead of looping over the gameobjects we add all faces to a list and sort them by their z-distance to the view position.
		sortedGameObjects.forEach((gameObject) => {
			const { object, transform, rotation } = gameObject;
			const { faces, vertices } = object;

			transform.add(gameObject.transformForce, deltaTime);
			rotation.add(gameObject.rotationForce, deltaTime);

			for (let i = 0; i < faces.length; i++) {
				const face = faces[i];
				const transformedFaces = face.map((index) =>
					this.translate.translate(
						this.rotate.rotateEuler(vertices[index], rotation),
						gameObject.transform,
					),
				);
				const vectorVertices = transformedFaces.map((v) =>
					v.sub(this.viewPosition),
				);

				if (!checkFace(vectorVertices, this.viewPosition)) continue;
				this.renderer.drawFace(vectorVertices, i, gameObject.faceColor);
			}

			if (!gameObject.showPoints) return;

			vertices.forEach((v, index: number) => {
				this.renderer.drawPoint(
					this.translate.translate(
						this.rotate.rotateEuler(v, rotation),
						gameObject.transform,
					),
					index,
				);
			});
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
