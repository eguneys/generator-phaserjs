# generator-phaserjs | [![Build Status](https://travis-ci.org/eguneys/generator-phaserjs.svg)](https://travis-ci.org/eguneys/generator-phaserjs)

> Yeoman generator for creating Phaser game applications, using Phaser, RequireJS and Gulp build tool - lets you quickly set up a project following best practices.

## Example project

The project template is available at [phaser-gulp-requirejs](https://github.com/eguneys/phaser-gulp-requirejs).

## Getting Started

## Usage

Install `generator-phaserjs`:
```bash
npm install -g generator-phaserjs
```

Make a new directory, and `cd` into it:
```bash
mkdir my-new-project && cd $_
```

Run `yo phaserjs`, optionally passing an app name:
```bash
yo phaserjs [app-name]
```

Run `gulp` for building with requirejs optimizer as a stand-alone application, and `gulp watch` for development.

## Generators

Available generators:

* App

  - [phaserjs](#app) (aka [phaserjs:app](#app))

* Phaser

  - [phaserjs:state](#state)
  - [phaserjs:prefab](#prefab)

### App

Sets up a new Phaser game app, generating all the boilerplate you need to get started.

``bash
$ yo phaserjs
```

// TODO options

### State

Generates a new state.

```bash
$ yo phaserjs:state mystate
// TODO
```

By default it will inject the state to `app.js` file.

####Options

* `--skip-inject` will skip the state injection.

###Prefab

Generates a new prefab.

```bash
$ yo emberfs:prefab marble
// TODO
```

By default it will generate a prefab extended from Phaser.Sprite.

#### Options

* `--group` generate a prefab extended from Phaser.Group.

## Configuration

This generator is scaffolding support for [phaser-gulp-requirejs](https://github.com/eguneys/phaser-gulp-requirejs). project template.

## Contribute

When submitting a bug fix, try to write a test that exposes the bug and fails before applying your fix.

When submitting a new feature, add tests that covers the feature.

### Notes

* In `generator-phaserjs` directory, run `npm link` to use what's in the local repo for `yo phaserjs`.
* When running tests, run `npm install && bower install` inside `test/fixtures` folder.

## License

MIT
