## spfx-pnpjs

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```
Create Project
------------------
yo @microsoft/sharepoint --solution-name "spfx-pnpjs" --component-name "spfx-pnpjs-wp" --component-description "This webpart will use the jQuery, bootstrap and font awesome. Query list using pnpjs" --component-type "webpart" --framework "none" --environment "spo" --package-manager "npm" --skip-feature-deployment


This package produces the following:
------------------------
```
npm install jquery --save
npm install @types/jquery --save-dev 
npm install bootstrap@4 --save 
npm install @types/bootstrap@4 --save-dev 
npm install --save @fortawesome/fontawesome-free
npm shrinkwrap
npm install url-loader --save-dev
npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
```
