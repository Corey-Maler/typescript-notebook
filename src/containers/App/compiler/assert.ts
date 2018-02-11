let asserts = 0;
export const assert = (a: any, b: any, msg?: string) => {
	asserts ++;
	if (a !== b) {
		console.error(`assert ${msg} failed`, a, b);
	}
}

export const done = () => {
	console.log('total asserts', asserts);
}