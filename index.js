'use strict';

module.exports = function(serverlessPath) {

  const path     = require('path'),
      SPlugin    = require(path.join(serverlessPath, 'ServerlessPlugin')),
      BbPromise  = require('bluebird');

  /**
   * ServerlessOptimizer
   */

  class ServerlessPluginBoilerplate extends SPlugin {

    /**
     * Constructor
     */

    constructor(S, config) {
      super(S, config);
    }

    /**
     * Define your plugins name
     */

    static getName() {
      return 'com.serverless.' + ServerlessPluginBoilerplate.name;
    }

    /**
     * Register Actions
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
     * Your Custom Action
     */

    _customAction(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log('-------------------');
        console.log('YOU JUST RAN YOUR CUSTOM ACTION!  YOU ARE IN CONTROL NOW...');
        console.log('-------------------');

        return resolve(evt);

      });
    }

    /**
     * Your Custom PRE Hook
     */

    _hookPre(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN BOILERPLATE\'S "PRE" HOOK HAS RUN BEFORE "FunctionRunLambdaNodeJs"');
        console.log('-------------------');

        return resolve(evt);

      });
    }

    /**
     * Your Custom POST Hook
     */

    _hookPost(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN BOILERPLATE\'S "POST" HOOK HAS RUN AFTER "FunctionRunLambdaNodeJs"');
        console.log('-------------------');

        return resolve(evt);

      });
    }
  }

  // Export Class
  return ServerlessPluginBoilerplate;

};