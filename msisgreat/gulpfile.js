'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push(
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader'
        }
      }
    );

    return generatedConfiguration;
  }
});
build.initialize(gulp);
