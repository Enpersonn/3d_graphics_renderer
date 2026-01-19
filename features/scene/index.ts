import { checkFace } from 'features/calculations/check-face';
import type { Camera } from 'features/objects/camera';
import type { GameObject } from 'features/objects/game-object';
import { Vector3 } from 'features/shared/vector';
import translate from 'features/transform/translate';
import type { Renderer } from '../renderer';
import { Runtime } from './runtime';

export default class Scene {
	private viewPosition = new Vector3(0, 0, 0);
	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
		private camera: Camera,
	) { }

	frame = (deltaTime: number) => {
		this.renderer.clear();
		this.renderer.renderSkyBox(this.viewPosition);

		this.camera.transform.add(
			[
				this.camera.transformForce.x,
				this.camera.transformForce.y,
				this.camera.transformForce.z,
				0,
			],
			deltaTime,
		);
		this.camera.rotation.add(
			[
				this.camera.rotationForce.x,
				this.camera.rotationForce.y,
				this.camera.rotationForce.z,
				0,
			],
			deltaTime,
		);

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
			if (!object) return;
			const { faces, vertices } = object;

			transform.add(
				[
					gameObject.transformForce.x,
					gameObject.transformForce.y,
					gameObject.transformForce.z,
					0,
				],
				deltaTime,
			);
			rotation.add(
				[
					gameObject.rotationForce.x,
					gameObject.rotationForce.y,
					gameObject.rotationForce.z,
					0,
				],
				deltaTime,
			);

			for (let i = 0; i < faces.length; i++) {
				const face = faces[i];
				const transformedFaces = face.map((index) =>
					translate(
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
	reset = () => { };
}
