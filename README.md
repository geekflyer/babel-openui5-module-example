babel-openui5-module-example
=======================

This app is an example of using ES6 modules (and ES6 classes) in UI5. It makes use of the [babel](https://babeljs.io) transpiler and [babel-openui5-module-formatter](https://github.com/geekflyer/babel-openui5-module-formatter) to transform ES6 syntax to plain UI5 modules and ES5 syntax. It's a port of https://github.com/TobiasOetzel/mdSkeleton.

**Note: This is an unofficial example in alpha / experimental state. Beware of using it for production right away. Contributions to make it ready for production are welcome!**


### How to use it?

1. Clone the repository `git clone https://github.com/geekflyer/babel-openui5-module-example.git`
2. run `npm install`
3. run `bower install`
4. start the app via the grunt task `grunt serve`
5. open your browser and point to `http://localhost:8080/test.html`. 

The `grunt serve` task starts a `connect` webserver and transpiles the ES6 files in the `app` directory into ES5 / UI5 syntax. The transpiled files can be found under `dist`. The transpilation is incremental, hence only changed sources are being transpiled.

### Limitations

- Unit / OPA Tests and test task configuration is not ready for ES6 yet.
- Only the `test.html` can be used as entry point. When opening the app via any of the other entry points (html files) it won't work yet.
- Only the `grunt serve` task is known to work atm. The other grunt tasks (e.g. qunit) likely won't work as expected.

Also have a look at [babel-openui5-module-formatter's](https://github.com/geekflyer/babel-openui5-module-formatter) limitations.

### License
I
Apache 2.0 © [Christian Theilemann](https://github.com/geekflyer)