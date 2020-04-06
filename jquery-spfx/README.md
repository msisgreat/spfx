## jquery-spfx

yo @microsoft/sharepoint --solution-name "jquery-spfx" --component-name "jqueryspfx-wp" --component-description "This webpart will use the jQuery, bootstrap and font awesome." --component-type "webpart" --framework "none" --environment "spo" --package-manager "npm" --skip-feature-deployment

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```
-------------------
Run these packages after creating project:
-------------------
```bash
npm install jquery --save
npm install @types/jquery --save-dev 
npm install bootstrap@4 --save 
npm install @types/bootstrap@4 --save-dev 
npm install --save @fortawesome/fontawesome-free
npm install url-loader --save-dev
```
### Below files are modified
```bash
gulpfile.js
config.json
webpart ts file 
```
