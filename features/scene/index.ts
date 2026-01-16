import { Rotate } from '../../app/welcome/rotate';
import type { Vector3 } from '../../app/welcome/types';
import { Cube } from '../objects/cube';
import type { Renderer } from '../renderer';
import { Runtime } from './runtime';

const DEFAULT_FORCE = {
    x: 0,
    y: 0,
    z: 0,
};

export default class Scene {
    private rotation = {
        x: 0.3 * Math.PI,
        y: 0.2 * Math.PI,
        z: 0.1 * Math.PI,
    };

    private rotate = new Rotate();

    private desenturilzedCoordinates = {
        x: 0,
        y: 0,
        z: 5,
    };

    constructor(private renderer: Renderer) { }

    frame = () => {
        const deltaTime = 1 / this.runtime.FPS;

        this.desenturilzedCoordinates.x += DEFAULT_FORCE.x * deltaTime;
        this.desenturilzedCoordinates.y += DEFAULT_FORCE.y * deltaTime;
        this.desenturilzedCoordinates.z += DEFAULT_FORCE.z * deltaTime;
        this.rotation.x += 0.1 * Math.PI * deltaTime;
        this.rotation.y += 0.1 * Math.PI * deltaTime;
        this.rotation.z += 0.1 * Math.PI * deltaTime;
        this.renderer.clear();

        // Dodeca.faces.forEach((face) => {
        // 	for (let i = 0; i < face.length; i++) {
        // 		const pointA = Dodeca.points[face[i]];
        // 		const pointB = Dodeca.points[face[(i + 1) % face.length]];
        // 		renderer.drawLine(
        // 			translate(rotate.rotateEuler(pointA, rotation)),
        // 			translate(rotate.rotateEuler(pointB, rotation)),
        // 		);
        // 	}
        // });
        Cube.faces.forEach((face, index: number) => {
            this.renderer.drawFace(
                face.map((index) =>
                    this.translate(
                        this.rotate.rotateEuler(
                            Cube.vertices[index],
                            this.rotation,
                        ),
                    ),
                ),
                index,
            );
        });

        Cube.vertices.forEach((v: Vector3, index: number) => {
            this.renderer.drawPoint(
                this.translate(this.rotate.rotateEuler(v, this.rotation)),
                index,
            );
        });
    };

    private runtime = new Runtime(this.frame);

    run = this.runtime.run;
    stop = this.runtime.stop;
    reset = () => {
        this.desenturilzedCoordinates = {
            x: 0,
            y: 0,
            z: 5,
        };
        this.rotation = {
            x: 0,
            y: 0,
            z: 0,
        };
        this.frame();
    };
    private translate = (point: Vector3) => {
        return {
            ...point,
            x: point.x + this.desenturilzedCoordinates.x,
            y: point.y + this.desenturilzedCoordinates.y,
            z: point.z + this.desenturilzedCoordinates.z,
        };
    };
}
