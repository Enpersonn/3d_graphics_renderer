import type { Vector3 } from "features/shared/classes/vector"
	;

export class Runtime {
	private rafId: number | null = null;
	private lastTs: number | null = null;
	public FPS = 30;
	constructor(private frame: (deltaTime: number) => void) { }

	private isRunning = false;

	run = () => {
		if (this.isRunning) return;
		this.isRunning = true;

		const loop = (timestamp: number) => {
			if (!this.isRunning) return;

			if (this.lastTs === null) this.lastTs = timestamp;
			const deltaTime = Math.min((timestamp - this.lastTs) / 1000, 0.05);
			this.lastTs = timestamp;

			this.frame(deltaTime);
			this.rafId = requestAnimationFrame(loop);
		};

		this.rafId = requestAnimationFrame(loop);
	};

	stop = () => {
		if (!this.rafId || !this.isRunning) return;
		this.isRunning = false;
		cancelAnimationFrame(this.rafId);
		this.rafId = null;
		this.lastTs = null;
		this.frame(0);
	};

	step = () => {
		this.frame(0.05)
	}

	reset = (values: [Vector3, Vector3][]) => {
		for (const [p, q] of values) Object.assign(q, p);
		this.frame(0);
	};
}
