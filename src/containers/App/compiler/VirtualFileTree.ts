import { ModuleResolutionHost } from 'typescript';

import { Volume } from 'memfs';

import { join } from 'path';

export class VirtualFileTree implements ModuleResolutionHost {
	private vol;
	private curDir: string;
	constructor(files: Object, startingDir: string) {
		this.vol = Volume.fromJSON(files);
		this.curDir = startingDir;
	}

	public mkDir(dirName: string): void {
		this.vol.mkdirSync(dirName);
	}

	public fileExists(fileName: string): boolean {
		return this.vol.existsSync(fileName);
	}
	public readFile(fileName: string): string | undefined {
		return this.vol.readFileSync(fileName, 'utf-8');
	}

	public writeFile(fileName: string, data: string): void {
		this.vol.writeFileSync(fileName, data);
	}

	public trace?(s: string): void {
		// FIXME: actually I don't know what should happens here
	}
	public directoryExists?(directoryName: string): boolean {
		try {
			return this.vol.statSync(directoryName).isDirectory();
		} catch (e) {
			return false;
		}

	}
	public realpath?(path: string): string {
		return path; // actually we work without links for now

	}
	public getCurrentDirectory?(): string {
		return this.curDir;
	}

	public getDirectories?(path: string): string[] {
		if (this.directoryExists(path)) {
			const isDirectory = source => this.vol.lstatSync(source).isDirectory();
			return this.vol.readdirSync(path).map(name => join(path, name)).filter(isDirectory)
		}
	}

	public getCanonicalFileName(fileName: string): string {
		return fileName; // FIXME: what exactly should be here?
	}
}