Ionic App Demo
=====================

## Using This Project

* Step 1: install global project requirements.

```bash
$ sudo npm install -g bower cordova gulp ionic
```

* Step 2: install node dependencies.

```bash
$ npm install
```

* Step 3: install bower dependencies.

```bash
$ bower install
```

* Step 4: test in a browser.

```bash
$ ionic serve
```

* Step 5: Build an app.

```bash
$ ionic platform add android/ios
$ ionic build android/ios
```



## Set Up Environments

#### Lint JavaScript

* Step 1

```bash
$ npm install jshint --save-dev
$ npm install async --save-dev
```

* Step 2
	* Copy cordova hooks [files](https://gist.github.com/agustinhaller/5e489e5419e43b11d7b7) to $project_dir/hooks/before_prepare/.
	* Give execution permissions to files by running

		```bash
		$ chmod +x $filename
		```


#### HTML Templates Transformation

* Step 1

```bash
$ npm install gulp-angular-templatecache --save-dev
```

* Step 2: edit gulpfile.js

```javascript
var templateCache = require('gulp-angular-templatecache');
var paths = {
    templatecache: ['./www/templates/**/*.html']
};

gulp.task('default', ['templatecache']);

gulp.task('templatecache', function(done) {
    gulp.src('./www/templates/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./www/js'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.templatecache, ['templatecache']);
});
```

* Stpe 3: edit ionic.project

```
"gulpStartupTasks": [
	"templatecache"
]
```

* Step 4: add reference templates.js in the index.html.

```html
<script src="dist/dist_js/app/templates.js"></script>
```

* Step 5: add templates module in the app.js.

```javascript
angular.module('jv', ['ionic', 'templates'])
```

* Step 6: update templateUrl value.

	* Before

		```javascript
		.state('app', {
	        url        : '/app',
	        abstract   : true,
	        templateUrl: 'templates/menu.html',
	        controller : 'AppCtrl'
	    })
		```

	* After

		```javascript
		.state('app', {
	        url        : '/app',
	        abstract   : true,
	        templateUrl: 'menu.html',
	        controller : 'AppCtrl'
	    })
		```


#### Enable ng-strict-di

* Step 1

```bash
$ npm install gulp-ng-annotate --save-dev
```

* Step 2: edit gulpfile.js

```javascript
var ngAnnotate = require('gulp-ng-annotate');
var paths = {
    ng_annotate: ['./www/js/*.js']
};

gulp.task('default', ['ng_annotate']);

gulp.task('ng_annotate', function(done) {
    gulp.src('./www/js/**/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(gulp.dest('./www/dist/dist_js/app'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.ng_annotate, ['ng_annotate']);
});
```

* Stpe 3: edit ionic.project

```
"gulpStartupTasks": [
	"ng_annotate"
]
```

* Step 4: change paths of JavaScript files in the index.html.

```html
<script src="dist/dist_js/app/app.js"></script>
```

* Step 5: add ng-strict-di directive in the index.html.

```html
<body ng-app="jv" ng-strict-di>
```


#### Concatenate JavaScript & CSS Files

* Step 1

```bash
$ npm install gulp-useref --save-dev
```

* Step 2: edit gulpfile.js

```javascript
var useref = require('gulp-useref');
var paths = {
    useref: ['./www/*.html']
};

gulp.task('default', ['useref']);

gulp.task('useref', function(done) {
    var assets = useref.assets();
    gulp.src('./www/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./www/dist'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.useref, ['useref']);
});
```

* Stpe 3: edit ionic.project

```
"gulpStartupTasks": [
	"useref"
]
```

* Step 4: edit the index.html.

```html
<!-- build:css dist_css/styles.css -->
<link href="css/ionic.app.css" rel="stylesheet">
<!-- endbuild -->

<!-- build:js dist_js/app.js -->
<script src="lib/ionic/js/ionic.bundle.js"></script>
<script src="lib/ngCordova/dist/ng-cordova.js"></script>
<script src="dist/dist_js/app/templates.js"></script>
<script src="dist/dist_js/app/base/index.js"></script>
<script src="dist/dist_js/app/base/AppCtrl.js"></script>
<script src="dist/dist_js/app/app.js"></script>
<!-- endbuild -->
```


#### Uglify, Minify & Obfuscate

* Step 1

```bash
$ npm install cordova-uglify --save-dev
$ npm instal mv --save-dev
```

* Step 2
	* Copy cordova hooks [files](https://gist.github.com/agustinhaller/426351993c70a0329ad0) to $project_dir/hooks/after_prepare/.
	* Give execution permissions to files by running

		```bash
		$ chmod +x $filename
		```



## References

* [Ionic Documentation](http://ionicframework.com/docs/)
* [Production ready apps with Ionic Framework](https://www.airpair.com/ionic-framework/posts/production-ready-apps-with-ionic-framework)
* [ionic代码压缩与代码混淆](http://liuwenzhuang.github.io/2015/11/ionic-minify-obfuscation)
* [Crosswalk comes to Ionic](http://blog.ionic.io/crosswalk-comes-to-ionic/)
