import calculateShadowOpacity from 'features/calculations/shadow-opacity';
import { type Vector3, Vector4 } from 'features/shared/classes/vector';
import { worldToScreen } from './transform';

export class Renderer {
	public height: number = 800;
	public width: number = 800;

	public backgroundColor: string = '#111827';
	public textColor: string = '#ff0000';
	public pointColor: string = '#93f893';

	public pointSize: number = 10;

	private ctx?: CanvasRenderingContext2D;
	private game?: HTMLCanvasElement;

	constructor(private light: Vector3) { }
	setContext(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}
	setGame(game: HTMLCanvasElement) {
		this.game = game;
	}
	clear() {
		if (!this.ctx) return;

		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	drawPoint(v: Vector4, index?: number, color?: string) {
		if (!this.ctx || !this.game) return;
		const point = worldToScreen(v, this.game as HTMLCanvasElement);

		const calculateFontSize = () => {
			const z = v.z;
			const fontSize = 150;
			return fontSize / z;
		};

		this.ctx.fillStyle = color ?? this.pointColor;
		this.ctx.fillRect(
			point.x - this.pointSize / 2,
			point.y - this.pointSize / 2,
			this.pointSize,
			this.pointSize,
		);

		if (index !== undefined) {
			this.ctx.font = `${calculateFontSize()}px Arial`;
			this.ctx.fillStyle = this.textColor;
			this.ctx.fillText(
				index.toString(),
				point.x - this.pointSize / 2,
				point.y - this.pointSize / 2,
			);
		}
	}

	drawLine(Wpoint1: Vector4, Wpoint2: Vector4) {
		if (!this.ctx || !this.game) return;
		const point1 = worldToScreen(Wpoint1, this.game);
		const point2 = worldToScreen(Wpoint2, this.game);
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = this.pointColor;
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}

	drawLight() {
		const l = this.light;
		this.drawPoint(new Vector4([l.x, l.y, l.z, 0]), undefined, "#ffff00");
	}

	drawFace(points: Vector4[], color: string) {
		const ctx = this.ctx;
		if (!ctx || !this.game) return;
		ctx.beginPath();

		const indexPointScreenSpace = points.map((point) =>
			worldToScreen(point, this.game as HTMLCanvasElement),
		);
		ctx.moveTo(indexPointScreenSpace[0].x, indexPointScreenSpace[0].y);
		for (let i = 1; i < indexPointScreenSpace.length; i++) {
			ctx.lineTo(indexPointScreenSpace[i].x, indexPointScreenSpace[i].y);
		}

		ctx.closePath();

		ctx.lineWidth = 0;

		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.fill();

		//Shadow ¨
		const shadowOpacity = calculateShadowOpacity(points, this.light);
		const shadowColor = `#000000${shadowOpacity}`;
		ctx.fillStyle = shadowColor;
		ctx.strokeStyle = shadowColor;
		ctx.stroke();
		ctx.fill();
	}

	renderSkyBox(viewPosition: Vector3) {
		const ctx = this.ctx;
		if (!ctx) return;

		const zenithColor = '#607aa4';
		const horizonColor = '#dffcfe';
		const groundColor = '#69625c';

		const calculateHorizonPosition = (viewPosition: Vector3) => {
			return viewPosition.y + 100;
		};

		const skyBoxGradient = ctx.createLinearGradient(0, 0, 0, this.height);
		skyBoxGradient.addColorStop(0, zenithColor);
		skyBoxGradient.addColorStop(0.45, zenithColor);
		skyBoxGradient.addColorStop(0.5, horizonColor);
		skyBoxGradient.addColorStop(0.55, groundColor);
		skyBoxGradient.addColorStop(1, groundColor);

		ctx.fillStyle = skyBoxGradient;

		ctx.fillRect(0, 0, this.width, this.height);
	}
}
