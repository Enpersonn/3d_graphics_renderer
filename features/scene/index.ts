import { checkFace } from 'features/calculations/check-face';
import {
	calculateMatrix4wMatrix4,
	calculateMatrix4wVector4,
} from 'features/calculations/matrix';
import calculateShadowOpacity from 'features/calculations/shadow-opacity';
import type { Camera } from 'features/objects/camera';
import type { GameObject } from 'features/objects/game-object';
import { worldToScreen } from 'features/renderer/transform';
import { Vector3 } from 'features/shared/classes/vector';
import { rotationMatrix } from 'features/transform/rotate';
import scaleMatrix from 'features/transform/scale';
import translationMatrix from 'features/transform/translate';
import type { Renderer } from '../renderer';
import { Runtime } from './runtime';

export default class Scene {
	private viewPosition = new Vector3(0, 0, 0);
	constructor(
		private renderer: Renderer,
		private gameObjects: GameObject[],
		private camera: Camera,
		private light: Vector3
	) { }

	frame = (deltaTime: number) => {
		this.renderer.clear();
		this.renderer.renderSkyBox(this.viewPosition);

		this.camera.transform.add(this.camera.transformForce, deltaTime);
		this.camera.rotation.add(this.camera.rotationForce, deltaTime);

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
			const { object, transform, rotation, scale } = gameObject;
			if (!object) return;
			const { indexBuffer, vertices } = object;

			transform.add(gameObject.transformForce, deltaTime);
			rotation.add(gameObject.rotationForce, deltaTime);
			scale.add(gameObject.scaleForce, deltaTime);

			const T = translationMatrix(transform);
			const R = rotationMatrix(rotation);
			const S = scaleMatrix(scale);

			const ModelMatrix = calculateMatrix4wMatrix4(
				calculateMatrix4wMatrix4(T, R),
				S,
			);

			const transformedVerteciesPositions = vertices.map(({ position }) => {
				const { x, y, z } = position;
				const q = calculateMatrix4wVector4(ModelMatrix, [
					x,
					y,
					z,
					1,
				]).sub([
					this.viewPosition.x,
					this.viewPosition.y,
					this.viewPosition.z,
					1,
				]);
				return q;
			});


			for (let k = 0; k < indexBuffer.length; k += 3) {
				const p1 = indexBuffer[k]
				const p2 = indexBuffer[k + 1]
				const p3 = indexBuffer[k + 2]

				const transformedPos = [
					transformedVerteciesPositions[p1],
					transformedVerteciesPositions[p2],
					transformedVerteciesPositions[p3],
				];
				if (!checkFace(transformedPos, this.viewPosition))
					continue;

				const projectedPoints = transformedPos.map(({ x, y, z }) =>
					worldToScreen(
						new Vector3(x, y, z),
						this.renderer.game as HTMLCanvasElement,
					),
				);


				const shadowOpacity = calculateShadowOpacity(
					transformedPos,
					this.light,
				);

				this.renderer.drawFace(
					projectedPoints,
					gameObject.faceColor,
					shadowOpacity
				);
			}
			if (gameObject.showPoints) {
				transformedVerteciesPositions.forEach((v, i) => {
					this.renderer.drawPoint(new Vector3(v.x, v.y, v.z), i);
				});
			}
		});
	};

	private runtime = new Runtime(this.frame);

	run = this.runtime.run;
	stop = this.runtime.stop;
	step = this.runtime.step;
	reset = () => { };
}
