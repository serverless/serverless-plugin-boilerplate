'use strict';

/**
 * Serverless Plugin Boilerplate
 * - Useful example/starter code for writing a plugin for the Serverless Framework.
 * - In a plugin, you can:
 *    - Create a Custom Action that can be called via the CLI or programmatically via a function handler.
 *    - Overwrite a Core Action that is included by default in the Serverless Framework.
 *    - Add a hook that fires before or after a Core Action or a Custom Action
 *    - All of the above at the same time :)
 *
 * - Setup:
 *    - Make a Serverless Project dedicated for plugin development, or use an existing Serverless Project
 *    - Make a ".serverless_plugins" folder in the root of your Project and copy this codebase into it. Title it your custom plugin name with the suffix "-dev", like "myplugin-dev"
 *    - Add the plugin name to the serverless.yml of your Project, on the [plugins] section
 *    - Start developing!
 *
 * - Good luck, serverless.com :)
 */

class BoilerplatePlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      custom: {
        usage: 'A custom command from the boilerplate plugin',
        lifecycleEvents: [
          'resources',
          'functions'
        ],
        options: {
          option: {  // These must be specified in the CLI like this "-option true" or "-o true"
            shortcut:    'o',
            usage: 'test option 1',
          },
        },
      },
    };
    this.hooks = {
      'before:deploy:resources': this.beforeDeployResources.bind(this),
      'deploy:resources': this.deployResources.bind(this),
      'after:deploy:resources': this.afterDeployResources.bind(this),
      'before:deploy:functions': this.beforeDeployFunctions.bind(this),
      'deploy:functions': this.deployFunctions.bind(this),
      'after:deploy:functions': this.afterDeployFunctions.bind(this),
    };
  }
  beforeDeployResources() {
    console.log('Before Deploy Resources');
  }

  deployResources() {
    console.log('Deploy Resources');
  }

  afterDeployResources() {
    console.log('After Deploy Resources');
  }

  beforeDeployFunctions() {
    console.log('Before Deploy Functions');
  }

  deployFunctions() {
    console.log('Deploying function: ', this.options.function);
  }

  afterDeployFunctions() {
    console.log('After Deploy Functions');
  }
}

module.exports = BoilerplatePlugin;

//parameters: [ // Use paths when you multiple values need to be input (like an array).  Input looks like this: "serverless custom run module1/function1 module1/function2 module1/function3.  Serverless will automatically turn this into an array and attach it to evt.options within your plugin
//  {
//    parameter: 'paths',
//    description: 'One or multiple paths to your function',
//    position: '0->' // Can be: 0, 0-2, 0->  This tells Serverless which params are which.  3-> Means that number and infinite values after it.
//  }
//]

// Godspeed!
