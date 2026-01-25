import type { Vector3, Vector4 } from "features/shared/classes/vector";
import calculateLightAngle from "./angle-to-light"


export default function calculateShadowOpacity(f: Vector4[], l: Vector3) {
    const diffuse = calculateLightAngle(f, l)
    const alpha = (1 - diffuse) * 255
    return toHexByte(alpha)
}

function toHexByte(value: number): string {
    return Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0");
}