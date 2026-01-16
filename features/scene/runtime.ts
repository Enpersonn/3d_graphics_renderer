import type { Vector3 } from 'features/shared/types';

export class Runtime {
	private interval?: NodeJS.Timeout;
	private frame: () => void;
	public FPS = 60;
	constructor(frame: () => void) {
		this.frame = frame;
	}

	run = () => {
		this.interval = setInterval(this.frame, 1 / this.FPS);
	};

	stop = () => {
		if (!this.interval) return;
		clearInterval(this.interval);
		this.interval = undefined;
		this.frame();
	};

	reset = (values: [Vector3, Vector3][]) => {
		for (const [p, q] of values) Object.assign(q, p);
		this.frame();
	};
}
