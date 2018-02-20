<div align="center">
    <a href="http://github.com/offroadcode/ernest/">
        <img width="239" src="https://github.com/offroadcode/Ernest/blob/master/resources/ernest-title.png" />
    </a>
    <br>
    <br>
    <img src="https://img.shields.io/badge/version-1.0.0-green.svg" />
    <img src="https://img.shields.io/badge/our-umbraco-orange.svg">
    <h1>Ernest</h1>
</div>

Ernest is a [Hemingway](http://www.hemingwayapp.com/)-like rich text editor package for the [Umbraco](https://umbraco.com/) backoffice by [Offroadcode](https://offroadcode.com). It helps editors ensure there's focus and clarity in their writing. Words and passages that could use some attention are highlighted with explanations why. 

<div align="center">
    <img width="800" src="https://github.com/offroadcode/Ernest/blob/master/resources/ernest-screenshot.png" />
</div>

## Installation & Use

You can install Ernest to your Umbraco project using either the Umbraco package installer or by downloading and installing it locally from the [package on the Our package repo](https://our.umbraco.org/projects/website-utilities/ernest/).

After installing the package, create a new DataType and select "Ernest Rich Text Editor" from the property editor dropdown. Add it to a DocType of your choice.

Once installed, in the editor for a page with Ernest you can see a rich text editor with a number of toolbar buttons for rich text. As you type into the editor, if your text contains common writing patterns that can reduce clarity they will be highlighted, with a matching explanation that appears beneath the editor. Altering the text to change your passage to avoid the writing pitfall will remove the highlighting.

## Outputting Ernest In Your Razor

The content of the Ernest property editor can be output in your templates as HTML. If you have a property editor with the alias of `foo`, then `@Model.Content.Foo` in your razor will produce the HTML in your page on the front end. The editing suggestion highlights in the editor do not appear in the HTML outputted.

## Questions or Issues?

If you have questions, feel free to ask them [here](https://github.com/Offroadcode/Ernest/issues).

## Contributing

Do you want to contribute to Ernest, or modify its functionality? Here's how to get started.

### Installing Ernest on Your Machine for Development

1. Download the repo.
2. If you do not already have the [Node.js](https://nodejs.org/) JavaScript runtime and [npm](https://docs.npmjs.com/getting-started/what-is-npm) package manager installed on your computer, you'll need to [follow this guide](https://docs.npmjs.com/getting-started/installing-node) to install them.
3. Open your [CLI](https://en.wikipedia.org/wiki/Command-line_interface) and navigate to the repo's `/build` directory.
4. Type the command `npm install`, which will install the various JavaScript packages used in the project.

### Editing the Ernest Code

Unlike most other Umbraco property editors, Ernest is written in [React](https://facebook.github.io/react/), which sits on top of a thin [Angular](https://angular.io/) wrapper layer that handles the communication with the backoffice. The text editor utilizes the [Draft.js](https://draftjs.org/) framework, and the writing suggestions are powered by [write good](https://github.com/btford/write-good).

The files to edit are located in `/build/assets`.

To watch and build any changes to the JS or SASS, type `npm run webpack` in the `/build` directory in your CLI. It is unlikely that you will need to make any changes to `/build/assets/js/controllers/AngularWrapper.js', as the Angular controller is by design a very lightweight wrapper over the React code.

Webpack builds to `/build/dist/`, with the built property editor files are located in the `/build/dist/App_Plugins/Ernest` directory.

If you wish to make changes to the property value converter packaged with Ernest, you can find the VS project for it in `/build/umbraco/Ernest`.

To package your files into an installable Umbraco package and rebuild the package convnerter DLL, you can type `npm run package` in the `/build` directory in your CLI. 

## Future Features Wishlist

The following items are on our current wishlist for improving Ernest.

* Making the editor's toolbar easy to customize with configuration either in the Developer tab or a .config file.
* In the same config file/Developer tab functionality, permit the developer to choose which kind of prose suggestions to receive.
* Combining the highlighted suggestions beneath the editor to reduce the vertical impact of many suggestions.
* Putting tooltips over highlights with the suggestion text when the mouse is over them.
* Abstracting out the prose suggestion functionality so that Write Good can be swapped out or augmented with other prose suggestion scripts.
* Add readability/grade level metrics.
