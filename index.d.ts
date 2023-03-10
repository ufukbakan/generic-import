export interface ModuleRecord<T=any> {
	fileName: string,
	value: T
}

export interface Options {
	/**
	Convert *dash-style* names (`foo-bar`) and *snake-style* names (`foo_bar`) to *camel-case* (`fooBar`).

	@default true
	*/
	readonly camelize?: boolean;

	/**
	File extensions to look for.

	Unless you've set the `fileExtensions` option, that means any `.js`, `.ts`, `.jsx`, `.tsx`, `.cjs`, `.mjs` files, in that order.

	Ignores the caller file and files starting with `.` or `_`.

	@default ['.js', '.ts', '.jsx', '.tsx', '.cjs', '.mjs']
	*/
	readonly fileExtensions?: string[];

	/**
	 * Enables recursion
	 * @default false
	 */
	readonly recursive?: boolean;
}

/**
Import all modules in a directory.

@param directory - Directory to import modules from. Unless you've set the `fileExtensions` option, that means any `.js`, `.json`, `.node` files, in that order. Ignores the caller file and files starting with `.` or `_`.

@example

```js
// Assuming `foo-bar.js`, `baz-faz.js` files under the `directory` folder.
const genericImport = require('generic-import');

const modules = genericImport('directory');

console.log(modules);
//=> [{fileName: "fooBar", value: [Function] }, {fileName: "bazFaz", value: [Function]}]
```
@returns {<ModuleRecord<T>[]}
*/
export default function genericImport<T=unknown>(
	directory?: string,
	options?: Options,
): ModuleRecord<T>[];