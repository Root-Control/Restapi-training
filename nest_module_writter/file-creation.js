'use strict';

const fs = require('fs'),
	utils = require('./utils/utils');

class FileCreation {
	constructor(moduleName) {
		this.moduleName = moduleName;
		this.formats = {
			capitalizedText: utils.capitalizeText(moduleName),
			pluralCapitalizedText: utils.pluralCapitalizedText(moduleName),
			upperCasedText: utils.upperCaseText(moduleName),
			lowerCasedText: utils.lowerCaseText(moduleName),
			lowerCasedSingularText: utils.lowerCasedSingularText(moduleName)
		};
	}

	createFiles() {
		const self = this;
		const folders = ['interface', 'joi', 'middleware', 'schema'];
		const types = ['controller', 'module', 'providers', 'service'];
		let templateFiles = [];
		return new Promise(async (resolve, reject) => {
			for (let x = 0; x < folders.length; x++) {
				if (folders[x] !== 'middleware') {
					if (folders[x] === 'joi') templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}/singularTemplate.${folders[x]}.ts` });
					else templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}s/singularTemplate.${folders[x]}.ts` });
				} else {
					templateFiles.push({ type: folders[x], location: `./Templates/${folders[x]}s/singularTemplate-validator.${folders[x]}.ts` }, 
									   { type: folders[x], location: `./Templates/${folders[x]}s/singularTemplateById.${folders[x]}.ts` });
				}
			}

			types.forEach(type => {
				templateFiles.push({ type: 'root', location: `./Templates/template.${type}.ts` });
			});

			console.log('Finished');
			console.log('Next steps:');
			console.log('1.- Add ' + this.formats.upperCasedText + '_MODEL_TOKEN');
			console.log('2.- Declare the module in app.module');
			console.log('3.- Enjoy');
			for (let i =  0; i < templateFiles.length; i++) {
				fs.readFile(templateFiles[i].location, 'utf8', async (err, buf) => {
					if (err) reject(err);
					else {
						const moduleTemplate = buf.toString();

						let newLocationFile = templateFiles[i].location.replace(/Templates/g, `../src/modules/${self.formats.lowerCasedText}s`)
																		.replace(/singularTemplate/g, `${self.formats.lowerCasedSingularText}`)
																		.replace(/template/g, `${self.formats.lowerCasedText}s`);
						console.log(newLocationFile);

						const code = moduleTemplate
										.replace(/PluralTemplate/g, self.formats.pluralCapitalizedText)
										.replace(/singularTemplate/g, self.formats.lowerCasedSingularText)
										.replace(/Template/g, self.formats.capitalizedText)
										.replace(/template/g, self.formats.lowerCasedText)
										.replace(/TEMPLATE/g, self.formats.upperCasedText);

						await self.writeCode(newLocationFile, code);
						resolve();
					}
				});
			}
			resolve();
		});
	};

	writeCode(location, code) {
		console.log(location);
		return new Promise((resolve, reject) => {
			fs.writeFile(location, code, err => {
				err ? reject(err): resolve();
			});
		});
	}
}

module.exports = FileCreation;