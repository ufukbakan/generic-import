const fs = require('fs');
const path = require('path');

// Prevent caching of this module so module.parent is always accurate.
delete require.cache[__filename];
const parentFile = module.parent && module.parent.filename;
const parentDirectory = path.dirname(parentFile || '.');

// The default file extensions used by `require()`.
const fileExtensions = new Set(['.js', '.ts', '.jsx', '.tsx', '.cjs', '.mjs']);

function genericImport(directory, options) {
	directory = path.resolve(parentDirectory, directory || '');

	options = {
		camelize: true,
		fileExtensions,
		recursive: false,
		...options
	};

	const files = fs.readdirSync(directory);

	const done = new Set();
	/** @type{Array<Record<string, any>} */const returnValue = [];

	for (const fileExtension of options.fileExtensions) {
		for (const file of files) {

			const filenameStem = path.basename(file).replace(/\.\w+$/, '');
			const fullPath = path.join(directory, file);

			if (options.recursive && fs.statSync(fullPath).isDirectory()) {
				const subModules = genericImport(fullPath, options);
				Object.keys(subModules).forEach(key => {
					returnValue.push({
						"fileName": `${file}/${key}`,
						"value": subModules[key]
					})
				});
				done.add(filenameStem);
			} else {

				if (done.has(filenameStem) ||
					fullPath === parentFile ||
					path.extname(file) !== fileExtension ||
					filenameStem[0] === '_' ||
					filenameStem[0] === '.') {
					continue;
				}
				const exportKey = options.camelize ? filenameStem.replace(/[-_](\w)/g, (m, p1) => p1.toUpperCase()) : filenameStem;
				returnValue.push({
					"fileName": exportKey,
					"value": require(fullPath)
				});
				done.add(filenameStem);
			}
		}
	}

	return returnValue;
};

module.exports = genericImport

