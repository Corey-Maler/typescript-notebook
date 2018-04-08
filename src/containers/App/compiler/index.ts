//import './compiler';

import { assert, done } from './assert';

import { VirtualFileTree } from './VirtualFileTree';

import { compile } from './compiler';

//const e = require('!raw-loader!./compiler.ts');
//console.log('moduleSoruce', e);

const v = new VirtualFileTree({
	'/src/temp': 'const a: number = 5;',
	'/t/file': 'sdfsdf',
},
	'/src'
);


assert(v.fileExists('/src/temp'), true);
assert(v.fileExists('/a'), false);
assert(v.readFile('/src/temp'), 'const a: number = 5;');

assert(v.directoryExists('/temp1'), false, 'dir doesnt exists');
assert(v.directoryExists('/src'), true, 'this exists');
assert(v.directoryExists('/src/temp'), false, 'not a directory');
v.mkDir('/t/a');
v.mkDir('/t/b');

const dirs = v.getDirectories('/t');
assert(dirs && dirs.length, 2, 'should be only two directories inside');

v.writeFile('/src/t', 'some data');
assert(v.readFile('/src/t'), 'some data', 'read data after write');

const a = compile(['const a: number = 3; a', `
export class Es {
	private p: string;
	constructor(s: string) {
		this.p = s;
	}

	get a(): string {
		return this.p;
	}

}; `]);
console.log('a', a);

done();