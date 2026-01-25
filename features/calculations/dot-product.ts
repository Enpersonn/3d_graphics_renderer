export function dotProduct(a: number[], b: number[]): number {
	return a.reduce((sum, v, i) => sum + v * b[i], 0);
}
