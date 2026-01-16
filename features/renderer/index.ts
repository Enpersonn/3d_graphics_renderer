import type { Vector3 } from '../../app/welcome/types';
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

    drawPoint(Vector3: Vector3, index: number) {
        if (!this.ctx || !this.game) return;
        const point = worldToScreen(Vector3, this.game as HTMLCanvasElement);

        const calculateFontSize = () => {
            const z = Vector3.z;
            const fontSize = 150;
            return fontSize / z;
        };

        this.ctx.font = `${calculateFontSize()}px Arial`;
        this.ctx.fillStyle = this.textColor;
        this.ctx.fillText(
            index.toString(),
            point.x - this.pointSize / 2,
            point.y - this.pointSize / 2,
        );
        this.ctx.fillStyle = this.pointColor;
        this.ctx.fillRect(
            point.x - this.pointSize / 2,
            point.y - this.pointSize / 2,
            this.pointSize,
            this.pointSize,
        );
    }

    drawLine(Wpoint1: Vector3, Wpoint2: Vector3) {
        if (!this.ctx || !this.game) return;
        const point1 = worldToScreen(Wpoint1, this.game);
        const point2 = worldToScreen(Wpoint2, this.game);
        this.ctx = { ...this.ctx, lineWidth: 2, strokeStyle: this.pointColor };
        this.ctx.beginPath();
        this.ctx.moveTo(point1.x, point1.y);
        this.ctx.lineTo(point2.x, point2.y);
        this.ctx.stroke();
    }

    drawFace(points: Vector3[], i: number) {
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

        const color1 = `rgba(255, 80, 80, 0.5)`;
        const color2 = `rgba(80, 255, 80, 0.5)`;
        const color3 = `rgba(80, 80, 255, 0.5)`;

        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
        ctx.fill();
    }
}
