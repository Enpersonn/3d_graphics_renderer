import { Camera } from 'features/objects/camera';
import { Cube } from 'features/objects/cube';
import { GameObject } from 'features/objects/game-object';
import { Plane } from 'features/objects/plane';
import { useLayoutEffect, useRef } from 'react';
import { Renderer } from '../../features/renderer';
import Scene from '../../features/scene';

export function GameScene() {
	const gameRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	const gameObjects = [
		new GameObject({
			faceColor: '#b4b4b4',
			object: new Plane(),
			rotation: { x: 0, y: 0, z: 0 },
			scale: { x: 7, y: 7, z: 1 },
			transform: { x: -4, y: -4, z: 12 },
		}),
		new GameObject({
			faceColor: '#ca3139',
			object: new Cube(),
			rotationForce: {
				x: -0.3 * Math.PI,
				y: 0.2 * Math.PI,
				z: -0.1 * Math.PI,
			},
			scale: { x: 2, y: 4, z: 1 },
			showPoints: true,
			transform: { x: -1, y: 1, z: 5 },
		}),
		new GameObject({
			faceColor: '#31b8ca',
			object: new Cube(),
			rotation: { x: 1, y: 0.76, z: 0.69 },
			rotationForce: {
				x: 0.3 * Math.PI,
				y: 0.2 * Math.PI,
				z: 0.1 * Math.PI,
			},
			scale: { x: 0.5, y: 0.5, z: 2 },
			transform: { x: 1, y: 0, z: 2 },
		}),
		new GameObject({
			faceColor: '#134349',
			object: new Cube(),
			rotation: { x: 0.3, y: 0.5, z: 0.1 },
			rotationForce: {
				x: -0.3 * Math.PI,
				y: 0.2 * Math.PI,
				z: -0.5 * Math.PI,
			},
			transform: { x: 1.5, y: 1, z: 3 },
		}),
		new GameObject({
			faceColor: '#46c527',
			object: new Cube(),
			rotation: { x: 3, y: 2, z: 1 },
			rotationForce: {
				x: 0.3 * Math.PI,
				y: 0.2 * Math.PI,
				z: 0.1 * Math.PI,
			},

			transform: { x: -2, y: -2, z: 3 },
		}),
	];

	const camera = new Camera({
		rotation: { x: 0, y: 0, z: 0 },
		transform: { x: 0, y: 0, z: 0 },
		transformForce: { x: 0, y: 0, z: 0 },
	});

	const rendererRef = useRef<Renderer | null>(null);
	if (!rendererRef.current) rendererRef.current = new Renderer();

	const sceneRef = useRef<Scene | null>(null);
	if (!sceneRef.current)
		sceneRef.current = new Scene(rendererRef.current, gameObjects, camera);

	const renderer = rendererRef.current;
	const scene = sceneRef.current;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		const canvas = gameRef.current;
		if (!canvas) return;

		canvas.width = renderer.width;
		canvas.height = renderer.height;

		ctxRef.current = canvas.getContext('2d');
		if (!ctxRef.current) return;
		renderer.setGame(canvas);
		renderer.setContext(ctxRef.current);
		scene.frame(0);

		return () => scene.stop();
	}, []);

	return (
		<div>
			<h1>Behold</h1>
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center justify-center gap-4">
					<canvas ref={gameRef} className="border border-stone-400" />
					<div className="flex justify-around gap-2">
						<button
							onClick={scene.run}
							className="h-8 w-32 rounded-md bg-blue-500 text-white"
							type="button"
						>
							Start
						</button>
						<button
							onClick={scene.stop}
							className="h-8 w-32 rounded-md bg-red-500 text-white"
							type="button"
						>
							Stop
						</button>
						<button
							onClick={scene.step}
							className="h-8 w-32 rounded-md bg-yellow-500 text-white"
							type="button"
						>
							Step
						</button>
						<button
							onClick={scene.reset}
							className="h-8 w-32 rounded-md bg-gray-500 text-white"
							type="button"
						>
							Reset
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
