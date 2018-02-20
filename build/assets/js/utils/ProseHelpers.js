import writeGood from 'write-good';
import {
	ContentState,
	convertToRaw,
	convertFromRaw,
	EditorState,
	RichUtils,
	SelectionState
} from 'draft-js';

import Constants from './Constants';

/**
 * @const ProseHelpers
 * @description A library of helpful functions for handling prose-related
 * functionality in Ernest.
 */
const ProseHelpers = {
	/**
	 * @method getAllSuggestionsForEditorState
	 * @param {EditorState} editorState
	 * @param {string=} reasonKeys - Optional string of comma seperated keys for
	 * the suggestions types to parse for. See
	 * ProseHelpers.getCheckOptionsForKeysOnly() for more details. If not
	 * provided, uses all keys by default.
	 * @returns {JSON[]}
	 * @description Builds a list of suggestions for prose fixes for a DraftJS
	 * editorState, organzing them with locations in the text noted by block,
	 * index, and offset.
	 */
	getAllSuggestionsForEditorState: function(editorState, reasonKeys) {
		let suggestions = [];
		const content = editorState.getCurrentContent();
		const blocks = convertToRaw(content).blocks;
		if (typeof reasonKeys == 'undefined' || reasonKeys == '') {
			reasonKeys = Constants.DEFAULT_REASON_KEYS;
		}
		const reasons = reasonKeys.split(',');
		blocks.forEach((block, blockIndex) => {
			reasons.forEach((reason) => {
				const suggestionsForBlock = ProseHelpers.getSuggestions(block.text, reason);
				suggestionsForBlock.forEach(function(suggestion) {
					suggestion['blockIndex'] = blockIndex;
					suggestion['block'] = block.key;
					suggestion['type'] = reason;
					suggestions.push(suggestion);
				});
			});
		});
		return ProseHelpers.sortSuggestions(suggestions);
	},

	/**
	 * @method getCheckOptionsForKeysOnly
	 * @param {string} reasonKeys
	 * @returns {JSON}
	 * @description Returns an options object for [write-good](https://github.com/btford/write-good)
	 * based upon a provided comma seperated list of matching keys. One or more
	 * of "passive | illusion | so | thereIs | weasel | adverb | tooWordy | cliches | eprime"
	 */
	getCheckOptionsForKeysOnly: function(reasonKeys) {
		const options = {
			passive: reasonKeys.indexOf('passive') > -1 ? true : false,
			illusion: reasonKeys.indexOf('illusion') > -1 ? true : false,
			so: reasonKeys.indexOf('so') > -1 ? true : false,
			thereIs: reasonKeys.indexOf('thereIs') > -1 ? true : false,
			weasel: reasonKeys.indexOf('weasel') > -1 ? true : false,
			adverb: reasonKeys.indexOf('adverb') > -1 ? true : false,
			tooWordy: reasonKeys.indexOf('tooWordy') > -1 ? true : false,
			cliches: reasonKeys.indexOf('cliches') > -1 ? true : false,
			eprime: reasonKeys.indexOf('eprime') > -1 ? true : false
		};
		return options;
	},

	/**
	 * @method getStyleKeyStringArray
	 * @returns {string[]}
	 */
	getStyleKeyStringArray: function() {
		return [
			Constants.StyleKeys.HIGHLIGHT,
			Constants.StyleKeys.HIGHLIGHT_ADVERB,
			Constants.StyleKeys.HIGHLIGHT_PASSIVE,
			Constants.StyleKeys.HIGHLIGHT_TOOWORDY,
			Constants.StyleKeys.HIGHLIGHT_SOTHEREISWEASEL,
			Constants.StyleKeys.HIGHLIGHT_CLICHETOBEILLUSION
		];
	},

	/**
	 * @method getSuggestions
	 * @param {string} text
	 * @param {string=} reasonKeys - Optional string of comma seperated keys for
	 * the suggestions types to parse for. See
	 * ProseHelpers.getCheckOptionsForKeysOnly() for more details. If not
	 * provided, uses all keys by default.
	 * @returns {JSON[]} suggestions
	 */
	getSuggestions: function(text, reasonKeys) {
		if (typeof reasonKeys !== 'undefined') {
			const options = ProseHelpers.getCheckOptionsForKeysOnly(reasonKeys);
			return writeGood(text, options);
		}
		return writeGood(text);
	},

	/**
	 * @method sortSuggestions
	 * @returns {JSON[]}
	 */
	sortSuggestions: function(suggestions) {
		suggestions.sort(function(a, b) {
			return a.blockIndex === b.blockIndex ? a.index - b.index : a.blockIndex - b.blockIndex;
		});
		return suggestions;
	}
};

module.exports = ProseHelpers;
