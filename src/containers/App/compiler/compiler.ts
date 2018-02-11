import { createProgram, CompilerOptions, ScriptTarget } from 'typescript';
import { CompositeCompilerHost } from './compileHost';

const compilerOptions: CompilerOptions = {
	target: ScriptTarget.ES2015,
	outDir: '/dist',
	lib: ['es6', 'dom']
};

export const compile = (strings: string[]) => {
	const host = new CompositeCompilerHost();
	
	// FILE HOST WITH SORUCES

	// TODO: compile pipeliine

	let ind = 0;
	const fileNames = strings.map(s => {
		const fName = `/src/file${ind}.ts`;
		host.writeFile(fName, s, true, () => {}, []);
		ind++;
		return fName;
	})
	const program = createProgram(fileNames, compilerOptions, host);

	var errors = program.getGlobalDiagnostics();
	console.log('errors ', errors);

	var checker = program.getTypeChecker();
	//var semanticErrors = checker.

	const em = program.emit();

	console.log('em errors', em.diagnostics);
	console.log('emitted files', em.emittedFiles);

	return host.outputs;
}

/*

*/