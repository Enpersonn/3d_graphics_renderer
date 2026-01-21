import type { Vector3, Vector4 } from "features/shared/vector"
import calculateLightAngle from "./angle-to-light"


export default function calculateShadowOpacity(f: Vector4[], l: Vector3) {
    const MAX_SHADOW_STRENGTH = 255
    const lightIntensity = calculateLightAngle(f, l)

    const shadowStrenght = MAX_SHADOW_STRENGTH / lightIntensity

    const hex = toHexByte(shadowStrenght)
    return hex
}

function toHexByte(value: number): string {
    return Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0");
}