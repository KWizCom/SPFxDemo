'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.copyAssets.taskConfig = { excludeHashFromFileNames: true }

build.initialize(gulp);
