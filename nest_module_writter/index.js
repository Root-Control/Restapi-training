'use strict';

const program = require('commander'),
	fs = require("fs"),
	path = require('path'),
	inquirer = require('inquirer'),
	chalk = require('chalk'),
	figlet = require('figlet'),
	shell = require('shelljs'),
	FolderCreation = require(path.resolve('./folder-creation')),
	FileCreation = require(path.resolve('./file-creation'));

//  Model syntax

/*  {module}s
    	|-----/interfaces
    		|-----{module}.interface.ts
        |-----/joi
        	|------{module}.joi.ts
        |-----/middlewares
        	|------{module}-validator.middleware.ts
        	|------{module}ById.middleware.ts
        |-----/schemas
        	|------{module}.schema.ts
        {module}'s'.controller.ts
        {module}'s'.gateway.ts
        {module}'s'.module.ts
        {module}'s'.providers.ts
        {module}'s'.service.ts
        {module}'s'.controller.ts
 */

(async () => {
	console.log(
	    chalk.green(
	      figlet.textSync("Root", {
	        font: "Ghost",
	        horizontalLayout: "default",
	        verticalLayout: "default"
	      })
	    )
	);

	let moduleName;

	program
		.version('0.1.0')
	  .option('-m, --module <name>')
	  .parse(process.argv);
	 
	if (program.module) {
		console.log(`Creating a new module called ${program.module}`);

		//  Creating the root folder
		const folderCreation = new FolderCreation(program.module);
		const fileCreation = new FileCreation(program.module);

		await folderCreation.createRootFolder();
		await folderCreation.createSubFolders();
		await fileCreation.createFiles();
	} else {
		console.log('name is not defined, please provide us a module name using --module command');
	}
})();


