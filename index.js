'use strict';

/**
 * Serverless Plugin Boilerplate
 * - Useful example/starter code for writing a plugin for the Serverless Framework.
 * - In a plugin, you can:
 *    - Create a Custom Action that can be called via the CLI or programmatically via a function handler.
 *    - Overwrite a Core Action that is included by default in the Serverless Framework.
 *    - Add a hook that fires before or after a Core Action or a Custom Action
 *    - All of the above at the same time :)
 * - Good luck, serverless.com :)
 */

module.exports = function(serverlessPath) {

  const path     = require('path'),
      fs         = require('fs'),
      SPlugin    = require(path.join(serverlessPath, 'ServerlessPlugin')),// You can access modules in Serverless by following this convention.
      BbPromise  = require('bluebird'); // Serverles uses Bluebird Promises and we recommend you do to because they are super helpful :)

  /**
   * ServerlessPluginBoierplate
   */

  class ServerlessPluginBoilerplate extends SPlugin {

    /**
     * Constructor
     * - Keep this and don't touch it unless you know what you're doing.
     */

    constructor(S, config) {
      super(S, config);
    }

    /**
     * Define your plugins name
     * - We recommend adding prefixing your personal domain to the name so people know the plugin author
     */

    static getName() {
      return 'com.serverless.' + ServerlessPluginBoilerplate.name;
    }

    /**
     * Register Actions
     * - If you would like to register a Custom Action or overwrite a Core Serverless Action, add this function.
     * - If you would like your Action to be used programatically, include a "handler" which can be called in code.
     * - If you would like your Action to be used via the CLI, include a "description", "context", "action" and any options you would like to offer.
     * - Your custom Action can be called programatically and via CLI, as in the example provided below
     */

    registerActions() {

      this.S.addAction(this._customAction.bind(this), {
        handler:       'customAction',
        description:   'A custom action from a custom plugin',
        context:       'custom',
        contextAction: 'run',
        options:       [{
          option:      'option',
          shortcut:    'o',
          description: 'test option 1'
        }]
      });

      return Promise.resolve();
    }

    /**
     * Register Hooks
     * - If you would like to register hooks (i.e., functions) that fire before or after a core Serverless Action or your Custom Action, include this function.
     * - Make sure to identify the Action you want to add a hook for and put either "pre" or "post" to describe when it should happen.
     */

    registerHooks() {

      this.S.addHook(this._hookPre.bind(this), {
        action: 'functionRunLambdaNodeJs',
        event:  'pre'
      });

      this.S.addHook(this._hookPost.bind(this), {
        action: 'functionRunLambdaNodeJs',
        event:  'post'
      });

      return Promise.resolve();
    }

    /**
     * Custom Action Example
     * - Here is an example of a Custom Action.  Include this and modify it if you would like to write your own Custom Action for the Serverless Framework.
     * - Be sure to ALWAYS accept and return the "evt" object, or you will break the entire flow.
     * - The "evt" object contains Action-specific data.  You can add custom data to it, but if you change any data it will affect subsequent Actions and Hooks.
     * - You can also access other Project-specific data @ this.S Again, if you mess with data on this object, it could break everything, so make sure you know what you're doing ;)
     */

    _customAction(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        // console.log(evt) // Contains Action Specific data
        // console.log(_this.S) // Contains Project Specific data

        console.log('-------------------');
        console.log('YOU JUST RAN YOUR CUSTOM ACTION!  YOU ARE IN CONTROL NOW...');
        console.log('-------------------');

        return resolve(evt);

      });
    }

    /**
     * Your Custom PRE Hook
     * - Here is an example of a Custom PRE Hook.  Include this and modify it if you would like to write your a hook that fires BEFORE an Action.
     * - Be sure to ALWAYS accept and return the "evt" object, or you will break the entire flow.
     * - The "evt" object contains Action-specific data.  You can add custom data to it, but if you change any data it will affect subsequent Actions and Hooks.
     * - You can also access other Project-specific data @ this.S Again, if you mess with data on this object, it could break everything, so make sure you know what you're doing ;)
     */

    _hookPre(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        // console.log(evt) // Contains Action Specific data
        // console.log(_this.S) // Contains Project Specific data

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN\'S CUSTOM "PRE" HOOK HAS RUN BEFORE "FunctionRunLambdaNodeJs"');
        console.log('-------------------');

        return resolve(evt);

      });
    }

    /**
     * Your Custom POST Hook
     * - Here is an example of a Custom POST Hook.  Include this and modify it if you would like to write your a hook that fires AFTER an Action.
     * - Be sure to ALWAYS accept and return the "evt" object, or you will break the entire flow.
     * - The "evt" object contains Action-specific data.  You can add custom data to it, but if you change any data it will affect subsequent Actions and Hooks.
     * - You can also access other Project-specific data @ this.S Again, if you mess with data on this object, it could break everything, so make sure you know what you're doing ;)
     */

    _hookPost(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        // console.log(evt) // Contains Action Specific data
        // console.log(_this.S) // Contains Project Specific data

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN\'S CUSTOM "POST" HOOK HAS RUN AFTER "FunctionRunLambdaNodeJs"');
        console.log('-------------------');

        return resolve(evt);

      });
    }
  }

  // Export Plugin Class
  return ServerlessPluginBoilerplate;

};

// Godspeed.