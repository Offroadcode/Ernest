import {
	ContentBlock,
	ContentState,
	convertToRaw,
	convertFromRaw,
	EditorState,
	Modifier,
	RichUtils,
	SelectionState
} from 'draft-js';
import Constants from './Constants';

/**
 * StyleHelpers - A library of helpful functions for managing styles for Draft.
 */
const StyleHelpers = {
	/**
	 * clearInlineStyle - Clean out of the editor state any inline styles with
	 * keys matching the array of strings (like 'BOLD' or 'ITALIC') and return
	 * the cleaned editor state.
	 * @param {EditorState} editorState
	 * @param {string[]} styles
	 * @returns {EditorState}
	 */
	clearInlineStyles: function(editorState, styles) {
		const content = editorState.getCurrentContent();
		const originalSelection = editorState.getSelection();
		let rawContent = convertToRaw(content);
		styles.forEach(function(style) {
			const cleanedBlocks = rawContent.blocks.map(function(block) {
				let newBlock = block;
				newBlock.inlineStyleRanges = block.inlineStyleRanges.map(function(range) {
					if (range.style == style) {
						return [];
					} else {
						return range;
					}
				});
				return newBlock;
			});
			rawContent.blocks = cleanedBlocks;
		});
		const newContent = convertFromRaw(rawContent);
		const cleanedEditor = EditorState.push(editorState, newContent, 'change-inline-style');
		const updatedEditor = EditorState.acceptSelection(cleanedEditor, originalSelection);
		return updatedEditor;
	},

	/**
	 * getSelectedBlocks - Returns an array of all `ContentBlock` instances
	 * within two block keys
	 * @param {ContentState} contentState
	 * @param {string} anchorKey
	 * @param {string} focusKey
	 * @return {ContentBlock[]}
	 */
	getSelectedBlocks: function(contentState, anchorKey, focusKey) {
		const isSameBlock = anchorKey === focusKey;
		const startingBlock = contentState.getBlockForKey(anchorKey);
		const selectedBlocks = [startingBlock];

		if (!isSameBlock) {
			let blockKey = anchorKey;

			while (blockKey !== focusKey) {
				const nextBlock = contentState.getBlockAfter(blockKey);
				selectedBlocks.push(nextBlock);
				blockKey = nextBlock.getKey();
			}
		}

		return selectedBlocks;
	},

	/**
	 * toggleBlockType - Modify all selected blocks in the selection of the
	 * `editorState` to have the same block type as the one provided, then
	 * return the updated `editorState`.
	 * @param {EditorState} editorState
	 * @param {string} blockType
	 * @returns {EditorState}
	 */
	toggleBlockType: function(editorState, blockType) {
		const content = editorState.getCurrentContent();
		const selection = editorState.getSelection();
		const selectedBlocks = StyleHelpers.getSelectedBlocks(
			content,
			selection.getAnchorKey(),
			selection.getFocusKey()
		);
		let doAllBlocksContainBlockType = true;

		selectedBlocks.forEach((block) => {
			if (block.getType() !== blockType) {
				doAllBlocksContainBlockType = false;
			}
		});

		const typeToChangeInto = doAllBlocksContainBlockType ? 'unstyled' : blockType;
		const newContent = Modifier.setBlockType(content, selection, typeToChangeInto);
		const newEditor = EditorState.push(editorState, newContent, 'change-block-type');
		return newEditor;
	},

	/**
	 * toggleHighlight - Toggle a highlight style for the editor at the indicated
	 * block and position.
	 * @param {EditorState} editorState
	 * @param {Object} option
	 * @param {string} option.blockKey
	 * @param {number} option.index
	 * @param {number} option.offset
	 * @returns {EditorState}
	 */
	toggleHighlight: function(editorState, option) {
		option['style'] = Constants.StyleKeys.HIGHLIGHT;
		return StyleHelpers.toggleInlineStyle(editorState, option);
	},

	/**
	 * toggleInlineStyle - Toggle a style for the editor at the indicated
	 * block and position.
	 * @param {EditorState} editorState
	 * @param {Object} option
	 * @param {string} option.blockKey
	 * @param {number} option.index
	 * @param {number} option.offset
	 * @param {string} option.style
	 * @returns {EditorState}
	 */
	toggleInlineStyle: function(editorState, option) {
		const originalSelection = editorState.getSelection();

		const newSelection = originalSelection.merge({
			anchorOffset: Number(option.index),
			focusOffset: option.focusIndex
				? option.focusIndex
				: Number(option.index) + Number(option.offset),
			anchorKey: option.blockKey,
			focusKey: option.focusBlockKey ? option.focusBlockKey : option.blockKey
		});

		const editorStateWithNewSelection = EditorState.acceptSelection(editorState, newSelection);
		const editorStateWithStyles = RichUtils.toggleInlineStyle(
			editorStateWithNewSelection,
			option.style
		);
		const editorStateWithStylesAndPreviousSelection = EditorState.acceptSelection(
			editorStateWithStyles,
			originalSelection
		);

		return editorStateWithStylesAndPreviousSelection;
	}
};

module.exports = StyleHelpers;
