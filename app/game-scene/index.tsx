import { Cube } from 'features/objects/cube';
import { GameObject } from 'features/objects/game-object';
import { useLayoutEffect, useRef } from 'react';
import { Dodeca } from '../../features/objects/dodeca';
import { Renderer } from '../../features/renderer';
import Scene from '../../features/scene';

export function GameScene() {
	const gameRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

	const gameObjects = [
		new GameObject(
			{ x: 1, y: 0, z: 2 },
			{ x: 0.3, y: 0.5, z: 0.1 },
			new Cube(),
			false,
			'#66ddec',
		),
		new GameObject(
			{ x: -1, y: -1, z: 3 },
			{ x: 3, y: 2, z: 1 },
			new Cube(),
			true,
		),
		new GameObject(
			{ x: -3, y: 3, z: 7 },
			{ x: 0, y: 0, z: 0 },
			new Dodeca(),
			false,
			'#ae259a',
		),
	];

	const rendererRef = useRef<Renderer | null>(null);
	if (!rendererRef.current) rendererRef.current = new Renderer();

	const sceneRef = useRef<Scene | null>(null);
	if (!sceneRef.current)
		sceneRef.current = new Scene(rendererRef.current, gameObjects);

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
