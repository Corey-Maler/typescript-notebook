import * as ts from 'typescript';
import { SourceFile, ScriptTarget, CancellationToken, CompilerOptions, WriteFileCallback, ResolvedModule, ResolvedTypeReferenceDirective, CompilerHost } from 'typescript';

import { VirtualFileTree } from './VirtualFileTree';

const defaultLib = require('!raw-loader!typescript/lib/lib.d.ts');
const lib6dts = require('!raw-loader!typescript/lib/lib.es6.d.ts');
const libDom = require('!raw-loader!typescript/lib/lib.dom.d.ts');
//console.log('dl', defaultLib);

console.log('ts', ts);

/*

get source file called /lib/lib.d.ts/es6.ts 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(ts.createFileDiagnostic(refFile, re… undefined
compileHost.ts:49 get source file called /lib/lib.d.ts/es6.tsx 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(ts.createFileDiagnostic(refFile, re… undefined
compileHost.ts:49 get source file called /lib/lib.d.ts/es6.d.ts 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(ts.createFileDiagnostic(refFile, re… undefined
compileHost.ts:49 get source file called /lib/lib.d.ts/dom.ts 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(ts.createFileDiagnostic(refFile, re… undefined
compileHost.ts:49 get source file called /lib/lib.d.ts/dom.tsx 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(ts.createFileDiagnostic(refFile, re… undefined
compileHost.ts:49 get source file called /lib/lib.d.ts/dom.d.ts 2 ƒ (hostErrorMessage) {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {

					*/

type CB = (a: string) => void;

export class CompositeCompilerHost implements CompilerHost {

	private readonly virtualFileTree: VirtualFileTree;

	get outputs() {
		return ['a', 'b'];
	}

	constructor() {
		this.virtualFileTree = new VirtualFileTree({
			'/src/b': '',
			'/lib/lib.d.ts': defaultLib,
			'/lib/es6.d.ts': lib6dts,
			'/lib/dom.d.ts': libDom,
			'/dist/t': '',
		}, '/src');
	}

	fileExists(fileName: string): boolean {
		return this.virtualFileTree.fileExists(fileName);
	}
	readFile(fileName: string): string | undefined {
		return this.virtualFileTree.readFile(fileName);
	}
	trace?(s: string): void {
		return this.virtualFileTree.trace(s);
	}
	directoryExists?(directoryName: string): boolean {
		return this.virtualFileTree.directoryExists(directoryName);
	}

	realpath?(path: string): string {
		return this.virtualFileTree.realpath(path);
	}
	getSourceFile(fileName: string,
		languageVersion: ScriptTarget,
		onError?: CB,
		shouldCreateNewSourceFile?: boolean): SourceFile | undefined
		{
			console.log('get source file called', fileName, languageVersion, onError, shouldCreateNewSourceFile);
			try {
				const fileData = this.virtualFileTree.readFile(fileName);
				return ts.createSourceFile(fileName, fileData, languageVersion);
			} catch(e) {
				console.log('not found required file '+fileName);
				return undefined;
			}
	}
	public getSourceFileByPath?
		(fileName: string,
		path: ts.Path,
		languageVersion:
			ScriptTarget,
		onError?: CB,
		shouldCreateNewSourceFile?: boolean):
		SourceFile | undefined {
		return undefined;
	}
	getCancellationToken?(): CancellationToken {
		return {
			isCancellationRequested() { return false; },
			throwIfCancellationRequested() { /* do nothing */ }
		};
	}
	getDefaultLibFileName(options: CompilerOptions): string {
		console.log('DEFAULT LIB FILENAME');
		return 'lib.d.ts';
	}
	getDefaultLibLocation?(): string {
		console.log('DEFAUL LIB LOCATION');
		return '/lib';
	}
	writeFile: WriteFileCallback = (name, data) => {
		console.log('write file', name, data);
		this.virtualFileTree.writeFile(name, data);
	}
	getCurrentDirectory(): string {
		return this.virtualFileTree.getCurrentDirectory();

	}
	getDirectories(path: string): string[] {
		return this.virtualFileTree.getDirectories(path);
	}
	getCanonicalFileName(fileName: string): string {
		return this.virtualFileTree.getCanonicalFileName(fileName);
	}
	public useCaseSensitiveFileNames(): boolean {
		return true // ts.sys.useCaseSensitiveFileNames;
	}
	public getNewLine(): string {
		return '/n'; //return ts.sys.newLine;
	}
	resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]):
		(ResolvedModule | undefined)[] {
		return moduleNames.map(a => undefined);
	}
	/**
	 * This method is a companion for 'resolveModuleNames' and is used to resolve ts.CompilerHost {

	get getSourceFile() {
		
	}

		/*
		private _currentDirectory: string;
		private _writer: IResultWriterFn;
		private _sources: ts.Map<string> = {};
		private _outputs: ts.Map<string> = {};
		public options: ts.CompilerOptions;

		/**
		 * Whether to search for files if a string source isn't found or not
		 */
		//fallbackToFiles: boolean = false;

		/*
		get sources(): ts.Map<string> {
			return shallowClone(this._sources);
		}

		get outputs(): ts.Map<string> {
			return shallowClone(this._outputs);
		}

		//readsFrom: ts.SourceType = SourceType.File;
		//writesTo: ts.SourceType = SourceType.File;

		constructor(options: ts.CompilerOptions) {
			//this.readsFrom = SourceType.File;
			this.getSourceFile = this._readFromFile;

			//this.writesTo = SourceType.File;
			this.writeFile = this._writeToFile;

			this.options = options || {};
			this.options.defaultLibFilename = this.options.defaultLibFilename || '';
		}

		// Implementing CompilerHost interface
		//getSourceFile: ts.ISourceReaderFn;

		// Implementing CompilerHost interface
		//writeFile: IResultWriterFn;

		// Implementing CompilerHost interface
		getNewLine = (): string => ts.sys.newLine;

		// Implementing CompilerHost interface
		useCaseSensitiveFileNames(): boolean {
			return ts.sys.useCaseSensitiveFileNames;
		}

		// Implementing CompilerHost interface
		getCurrentDirectory(): string {
			if(this.getSourceFile === this._readFromStrings)
				return '';

			return this._currentDirectory || (this._currentDirectory = ts.sys.getCurrentDirectory());
		}

		// Implementing CompilerHost interface
		getDefaultLibFilename(): string {
			return this.options.defaultLibFilename || path.join(__dirname, "lib", "lib.d.ts");
		}

		// Implementing CompilerHost interface
		getCanonicalFileName(fileName: string): string {
			// if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
			// otherwise use toLowerCase as a canonical form.
			return ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
		}

		readFromStrings(fallbackToFiles: boolean = false): CompositeCompilerHost {
			this.fallbackToFiles = fallbackToFiles;
			this.readsFrom = SourceType.String;
			this.getSourceFile = this._readFromStrings;
			return this;
		}

		readFromFiles(): CompositeCompilerHost {
			this.readsFrom = SourceType.File;
			this.getSourceFile = this._readFromFile;
			return this;
		}

		addSource(contents: string)
		addSource(contents: Source)
		addSource(name: string, contents: string)
		addSource(nameOrContents, contents?): CompositeCompilerHost {
			var source;

			if(typeof contents == 'undefined')
				source = new StringSource(nameOrContents);
			else
				source = new StringSource(contents, nameOrContents);

			this._sources[source.filename] = source.contents;
			return this;
		}

		getSourcesFilenames(): string[] {
			var keys = [];

			for(var k in this.sources) if(this.sources.hasOwnProperty(k))
				keys.push(k);

			return keys;
		}

		writeToString(): CompositeCompilerHost {
			this.writesTo = SourceType.String;
			this.writeFile = this._writeToString;
			return this;
		}

		writeToFiles(): CompositeCompilerHost {
			this.writesTo = SourceType.File;
			this.writeFile = this._writeToFile;
			return this;
		}

		redirectOutput(writer: boolean)
		redirectOutput(writer: IResultWriterFn)
		redirectOutput(writer): CompositeCompilerHost {
			if(typeof writer == 'function')
				this._writer = writer;
			else
				this._writer = null;

			return this;
		}

		//////////////////////////////
		// private methods
		//////////////////////////////
		private _readFromStrings(filename: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile {

			if (path.normalize(filename) === this.getDefaultLibFilename())
				return this._readFromFile(filename, languageVersion, onError);

			if (this._sources[filename])
				return ts.createSourceFile(filename, this._sources[filename], languageVersion,  "0");

			if(this.fallbackToFiles)
				return this._readFromFile(filename, languageVersion, onError);

			return undefined;
		}

		private _writeToString(filename: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {

			this._outputs[filename] = data;

			if(this._writer)
				this._writer(filename, data, writeByteOrderMark, onError);
		}

		private _readFromFile(filename: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile {
			try {
				var text = ts.sys.readFile(path.normalize(filename));
			}
			catch (e) {
				if (onError) {
					onError(e.message);
				}

				text = "";
			}
			return text !== undefined ? ts.createSourceFile(filename, text, languageVersion, "0") : undefined;
		}

		private _writeToFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
			var existingDirectories: ts.Map<boolean> = {};

			function directoryExists(directoryPath: string): boolean {
				if (ts.hasProperty(existingDirectories, directoryPath)) {
					return true;
				}
				if (ts.sys.directoryExists(directoryPath)) {
					existingDirectories[directoryPath] = true;
					return true;
				}
				return false;
			}

			function ensureDirectoriesExist(directoryPath: string) {
				if (directoryPath.length > ts.getRootLength(directoryPath) && !directoryExists(directoryPath)) {
					var parentDirectory = ts.getDirectoryPath(directoryPath);
					ensureDirectoriesExist(parentDirectory);
					ts.sys.createDirectory(directoryPath);
				}
			}

			try {
				if(this._writer) {
					this._writer(fileName, data, writeByteOrderMark, onError);
				}
				else {
					ensureDirectoriesExist(ts.getDirectoryPath(ts.normalizePath(fileName)));
					ts.sys.writeFile(fileName, data, writeByteOrderMark);
				}
				this._outputs[fileName] = (writeByteOrderMark ? '\uFEFF' : '') + data;
			}
			catch (e) {
				if (onError) onError(e.message);
			}
		}
		*/
	}