'use strict';

const BbPromise = require('bluebird');

/**
 * ServerlessOptimizer
 */

class ServerlessOptimizer {

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
    return 'com.yourdomain.' + ServerlessOptimizer.name;
  }

  /**
   * Register Hooks
   */

  registerHooks() {

    this.S.addHook(this._hook.bind(this), {
      action: 'codePackageLambdaNodejs',
      event:  'post'
    });

    return Promise.resolve();
  }

  _hook(evt) {

    let _this = this;

    return new BbPromise(function (resolve, reject) {

      console.log("HOOK RUN");

      return resolve(evt);

    });
  }
}

module.exports = ServerlessOptimizer;
