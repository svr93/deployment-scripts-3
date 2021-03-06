#!/usr/bin/env bash

currentDir=$(pwd)

# default project name
projectName='__project'

while [[ "$1" != "" ]]; do
    case $1 in
        -name )                     shift
                                    projectName=$1
                                    ;;

        * )                         echo 'error: bad param'
                                    ;;
    esac
    shift
done

projectDir='../'${projectName}

mkdir ${projectDir}

cp example-.gitignore ${projectDir}'/.gitignore'
cp example-karma.conf.js ${projectDir}'/karma.conf.js'
cp -r example-test-client ${projectDir}'/test-client'
cp example-.babelrc ${projectDir}'/.babelrc'
cp example-.eslintrc ${projectDir}'/.eslintrc'
cp example-gulpfile.js ${projectDir}'/gulpfile.js'
cp example-.bowerrc ${projectDir}'/.bowerrc'

mkdir ${projectDir}'/client'

cp example-index.html ${projectDir}'/client/index.html'

srcDir=${projectDir}'/client/src'
mkdir ${srcDir}
cp -r example-global ${srcDir}'/global'
cp -r example-app ${srcDir}'/app'
cp -r example-requirejs-config.js ${srcDir}'/requirejs-config.js'
cp -r example-main.js ${srcDir}'/main.js'

cd ${projectDir}
git init
npm init

npm i --save-dev karma

json -I -f package.json \
-e 'this.scripts.test="node ./node_modules/karma/bin/karma start karma.conf.js"'
json -I -f package.json \
-e 'this.engines={ "node" : "6.4" }'

npm i --save-dev jasmine
npm i --save-dev karma-jasmine

npm i --save-dev karma-chrome-launcher
npm i --save-dev karma-firefox-launcher
npm i --save-dev karma-safari-launcher
npm i --save-dev karma-safaritechpreview-launcher
# [future] setup Edge VM
# https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
# https://www.npmjs.com/package/karma-virtualbox-edge-launcher

npm i --save-dev requirejs
npm i --save-dev karma-requirejs

typings init
typings i --save --global dt~jasmine
typings i --save --global dt~require

git add .gitignore
git add client/src/global/*
git add client/src/requirejs-config.js
git add test-client/*
git add karma.conf.js
git add package.json
git add typings.json
git commit -a -m 'add test frameworks'

npm i --save-dev flow-bin # for WS 2016.3
touch .flowconfig

git add .flowconfig
git commit -a -m 'add Flow support'

npm i --save-dev karma-babel-preprocessor
npm i --save-dev babel-plugin-transform-es2015-arrow-functions
npm i --save-dev babel-plugin-transform-es2015-block-scoping
git add .babelrc
git commit -a -m 'add Babel support'

npm i --save-dev eslint
npm i --save-dev eslint-plugin-requirejs
git add .eslintrc
git commit -a -m 'add Eslint support'

npm i --save-dev gulp
npm i --save-dev gulp-connect
npm i --save-dev gulp-if
npm i --save-dev yargs
git add gulpfile.js
git commit -a -m 'add Gulp support'

npm i --save-dev gulp-babel
git commit -a -m 'process JS in gulpfile.js'

git add .bowerrc
git commit -a -m 'add .bowerrc & update .gitignore'

bower init
git add bower.json
git commit -a -m 'initialize bower'

bower i --save-dev requirejs
bower i --save almond

bower i --save angular#1.5.9
bower i --save angular-mocks#1.5.9
typings i --save dt~angular
bower i --save angular-ui-router
bower i --save ui-router-extras
typings i --save dt~angular-ui-router
bower i --save bluebird
typings i --save dt~bluebird

bower i --save require-css
bower i --save text
bower i --save selector-alias

git commit -a -m 'add js libraries & typings'

git add 'client/index.html'
git commit -a -m 'add index.html'

git add 'client/src/app/util/selector.js'
git add 'client/src/main.js'
git commit -a -m 'add RequireJS base config, wrappers; fix index.html paths'

npm i --save-dev gulp-postcss
npm i --save-dev postcss-css-variables
npm i --save-dev karma-postcss-preprocessor
git commit -a -m 'process CSS in gulpfile.js'

cd ${currentDir}
