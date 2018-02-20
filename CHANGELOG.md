# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## v1.0.0

### Changed

* Version bump for release.

## v1.0.0-beta.2

### Added

* Added tree shaking to Webpack script to reduce `bundle.js` filesize.

### Changed

* Changed `/build/assets/components/views/Ernest/Ernest.js` into a class to handle binding of editor focus properly.
* Moved the colors for highlights to `/build/assets/utils/constants.js` to avoid magic strings.
* Significant updates to `README.MD` in preparation for public release.
* Updates to the Umbraco package config meta.
* Updated `.gitignore` to prevent inclusion of VS local machine files from entering repo.

### Fixed

* The browser gives focus to the editor when the box is clicked on even if it's not inside the actual Draft.js line.

### Removed

* Removed `/build/assets/components/views/Ernest/components/Toolbar/Toolbar.js` as its functionality was moved up into the parent `Ernest.js` component to reduce code complexity and permit focus binding.

## v1.0.0-beta.1

### Added

* Added (grunt-umbraco-package)[https://www.npmjs.com/package/grunt-umbraco-package] based solution to build to a package zip file using `npm run package`.
* Added a property value converter.

### Changed

* Modified how value is saved in the Angular wrapper so that `$scope.model.value.raw` is a [`RawDraftContentState`](https://github.com/facebook/draft-js/blob/master/src/model/encoding/RawDraftContentState.js) object using [`convertFromRaw`](https://draftjs.org/docs/api-reference-data-conversion.html#convertfromraw), and `$scope.model.value.html` is a string with the HTML version of the editor's content.

## v1.0.0-alpha.5

### Added

* Added support for [SASS](https://sass-lang.com/) that compiles to CSS.
* Added constants for blocktypes.
* Added [Prettier](https://prettier.io/).

### Changed

* Updated [Webpack](https://webpack.js.org/) to v3.
* Moved toolbar to its own component and simplified its event handlers.

### Fixed

### Removed

## v1.0.0-alpha.4

### Added

* Added H1, H2, H3, Numbers, Quote, and Bullets buttons that control block type functionality.

### Changed

* Updated styles for toolbar.

## v1.0.0-alpha.3

### Added

* Added some styling to make it more closely resemble an Umbraco editor.
* Added initial version of a toolbar with bold and italic support.

### Changed

* Highlighting for suggestions now are color-coded based on suggestion type.

### Fixed

* Fixed issue where user was unable to escape focus from editor due to [Editor.forceSelection()](https://draftjs.org/docs/api-reference-editor-state.html#forceselection) keeping it locked.

## v1.0.0-alpha.2

### Added

* Added highlighting inside the text editor where suggestions are taking place.

## v1.0.0-alpha.1

#### Added

* This is the original pre-release.
