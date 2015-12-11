'use strict';

module.exports = function(root) {

  const path     = require('path'),
      SPlugin    = require(path.join(root, 'ServerlessPlugin')),
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

    _hookPre(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN BOILERPLATE\'S "PRE" HOOK HAS RUN');
        console.log('-------------------');

        return resolve(evt);

      });
    }

    _hookPost(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log('-------------------');
        console.log('YOUR SERVERLESS PLUGIN BOILERPLATE\'S "POST" HOOK HAS RUN');
        console.log('-------------------');

        return resolve(evt);

      });
    }
  }

  // Export Class
  return ServerlessPluginBoilerplate;

};