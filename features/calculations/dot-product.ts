export function dotProduct(a: number[], b: number[]): number {
	const q: number[] = [0];

	a.forEach((v, i) => {
		q[i] = v * b[i];
	});
	return q.reduce((acc, cur) => acc + cur);
}
