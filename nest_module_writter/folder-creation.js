'use strict';

const fs = require('fs');
const utils = require('./utils/utils');


class FolderCreation {
	constructor(moduleName) {
		this.moduleName = utils.lowerCaseText(moduleName);
	}

	createRootFolder() {
		return new Promise(resolve => {
			const rootDir = `../src/modules/${this.moduleName}s`;
			fs.mkdirSync(rootDir);
			resolve();
		});
	};

	createSubFolders() {
		return new Promise(async resolve => {
			await this.createInterfaceFolder();
			await this.createJoiFolder();
			await this.createMiddlewaresFolder();
			await this.createSchemasFolder();
			resolve();
		});
	};

	createInterfaceFolder() {
		return new Promise((resolve, reject) => {
			const interfaceDir = `../src/modules/${this.moduleName}s/interfaces`;

			fs.mkdir(interfaceDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createJoiFolder() {
		return new Promise((resolve, reject) => {
			const joiDir = `../src/modules/${this.moduleName}s/joi`;

			fs.mkdir(joiDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createMiddlewaresFolder() {
		return new Promise((resolve, reject) => {
			const middlewareDir = `../src/modules/${this.moduleName}s/middlewares`;

			fs.mkdir(middlewareDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};

	createSchemasFolder() {
		return new Promise((resolve, reject) => {
			const schemaDir = `../src/modules/${this.moduleName}s/schemas`;

			fs.mkdir(schemaDir, { recursive: true }, err => {
			  if (err) reject();
			  else resolve();
			});

		});
	};
}

module.exports = FolderCreation;