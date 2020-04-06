## auto-deploy

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```
This sample contains the custom build function inside gulpfile.js 
Run the below command to install the spsync creds: Then add the build commands

npm install gulp-spsync-creds --save-dev --save-exact

Below is the content from gulpfile.js
----------------------------------------
Open the gulpfile.js to see the build commands added
3 commands added


Package-solution.json
------------------
"version": "1.0.0"

Package.json
----------
"scripts": {
    "build": "gulp bundle",
    "clean": "gulp clean",
    "test": "gulp test",
    "deploy": "gulp clean && gulp bundle --ship && gulp package-solution --ship",
    "publish": "gulp upload-to-sharepoint --ship && gulp upload-app-pkg --ship"
  }

