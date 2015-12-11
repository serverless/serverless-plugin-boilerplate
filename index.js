'use strict';

module.exports = function(root) {

  const path     = require('path'),
      SPlugin    = require(path.join(root, 'ServerlessPlugin')),
      BbPromise  = require('bluebird');

  /**
   * ServerlessOptimizer
   */

  class ServerlessOptimizer extends SPlugin {

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
      return 'com.serverless.' + ServerlessOptimizer.name;
    }

    /**
     * Register Hooks
     */

    registerHooks() {

      this.S.addHook(this._hook.bind(this), {
        action: 'functionRunLambdaNodeJsPost',
        event:  'post'
      });

      return Promise.resolve();
    }

    _hook(evt) {

      let _this = this;

      return new BbPromise(function (resolve, reject) {

        console.log("----------- HOOK RUN");

        return resolve(evt);

      });
    }
  }

  // Export Class
  return ServerlessOptimizer;

};