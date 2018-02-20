// @flow
import React from 'react';
import {
	ContentState,
	convertToRaw,
	convertFromRaw,
	EditorState,
	RawDraftContentState,
	RichUtils,
	SelectionState
} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

// utils
import Constants from '../../../utils/Constants';
import ProseHelpers from '../../../utils/ProseHelpers';
import StyleHelpers from '../../../utils/StyleHelpers';

// components
import Ernest from '../../views/Ernest/Ernest';

const enableStateLogging = false;

/**
 * @class ErnestLogic
 */
class ErnestLogic extends React.Component {
	constructor(props) {
		super(props);

		const value = props.value;
		const contentState = value && value.raw && value.raw !== '' ? convertFromRaw(value.raw) : false;
		const editorState = contentState 
				? EditorState.createWithContent(contentState)
				: EditorState.createEmpty();

		this.state = {
			editor: editorState
		};
	}

	// React Lifecycle Methods /////////////////////////////////////////////////

	componentWillReceiveProps(nextProps) {
		if (this.isContentFromPropsNew(nextProps)) {
			this.updateEditorStateFromValue(nextProps.value.raw);
		}
	}

	// Helper Functions ////////////////////////////////////////////////////////

	/**
	 * @method convertEditorStateToHtml
	 * @param {EditorState} editorState
	 * @returns {HTML}
	 */
	convertEditorStateToHtml = (editorState: EditorState) => {
		const content = editorState.getCurrentContent();
		const html = stateToHTML(content);
		return html;
	};

	/**
	 * @method convertEditorStateToValue - Converts the content value of the
	 * editorState into a safe JSON object that can be passed up to the
	 * `AngularWrapper` or anywhere else.
	 * @param {EditorState} editorState
	 * @returns {RawDraftContentState}
	 */
	convertEditorStateToValue = (editorState: EditorState) => {
		const content = editorState.getCurrentContent();
		const value = convertToRaw(content);
		return value;
	};

	/**
	 * @method getEvents - Returns an object bound with the event handlers
	 * needed for the child components.
	 * @return {JSON}
	 */
	getEvents = () => {
		return {
			onBlockTypeButtonClick: this.onBlockTypeButtonClick,
			onInlineClick: this.onInlineClick,
			onValueChange: this.onValueChange
		};
	};

	/**
	 * @method getHighlightsStyleKey - Returns a key to match the type of reason
	 * that a suggestion was made, for use in styling highlights.
	 * @param {string} reasonType
	 * @returns {string}
	 */
	getHighlightStyleKey = (reasonType: string) => {
		switch (reasonType) {
			case 'passive':
				return Constants.StyleKeys.HIGHLIGHT_PASSIVE;
			case 'adverb':
				return Constants.StyleKeys.HIGHLIGHT_ADVERB;
			case 'tooWordy':
				return Constants.StyleKeys.HIGHLIGHT_TOOWORDY;
			case 'so':
			case 'thereIs':
			case 'weasel':
				return Constants.StyleKeys.HIGHLIGHT_SOTHEREISWEASEL;
			case 'cliches':
			case 'eprime':
			case 'illusion':
				return Constants.StyleKeys.HIGHLIGHT_CLICHETOBEILLUSION;
			default:
				return Constants.StyleKeys.HIGHLIGHT;
		}
	};

	/**
	 * @method highlightSuggestions - Highlights all suggestions for the prose
	 * with suggestion type-specific color codes.
	 * @param {EditorState} editor
	 * @returns {EditorState}
	 */
	highlightSuggestions = (editor: EditorState) => {
		const suggestions = ProseHelpers.getAllSuggestionsForEditorState(editor);
		let updatedEditor = editor;
		suggestions.forEach((suggestion) => {
			const option = {
				blockKey: suggestion.block,
				index: suggestion.index,
				offset: suggestion.offset,
				style: this.getHighlightStyleKey(suggestion.type)
			};
			updatedEditor = StyleHelpers.toggleInlineStyle(updatedEditor, option);
		});
		return updatedEditor;
	};

	/**
	 * @method isContentFromPropsNew -  Returns true if the content value coming
	 * from props doesn't match the current state's editor content value.
	 * @param {object} newProps
	 * @param {RawDraftContentState} newProps.value
	 * @returns {boolean}
	 */
	isContentFromPropsNew = (newProps: { value: {raw: RawDraftContentState }}) => {
		const editorState = this.state.editor;
		const currentRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		const nextRaw = JSON.stringify(newProps.value.raw);
		return currentRaw !== nextRaw;
	};

	/**
	 * @method updateEditorStateFromValue
	 * @param {RawDraftContentState} value
	 * @returns {void}
	 */
	updateEditorStateFromValue = (value: RawDraftContentState) => {
		if (value && value !== '') {
            const editorState = this.state.editor;
			const contentState = convertFromRaw(value);
			const newEditorState = EditorState.push(editorState, contentState);
			this.updateState({ editor: newEditorState });
		}
	};

	/**
	 * @method updateState
	 * @param {JSON} stateChange
	 * @param {function=} callbackAfterStateChange
	 * @returns {JSON}
	 * @description Updates this.state with the provided stateChange.
	 */
	updateState = (stateChange: JSON, callbackAfterStateChange?: () => void) => {
		if (enableStateLogging) {
			console.group('===ErnestLogic===');
			console.log('%c old state:', 'color:gray', this.state);
			console.log('%c stateChange:', 'color:blue', stateChange);
		}
		const newState = Object.assign({}, this.state, stateChange);
		if (callbackAfterStateChange) {
			this.setState(newState, () => callbackAfterStateChange());
		} else {
			this.setState(newState);
		}
		if (enableStateLogging) {
			console.log('%c new state:', 'color:green', newState);
			console.groupEnd('===ErnestLogic===');
		}
		return this.state;
    };
    
    updateValue = (editor: EditorState) => {
        const value = {
            raw: this.convertEditorStateToValue(this.state.editor),
            html: this.convertEditorStateToHtml(this.state.editor)
        };
        this.props.onValueChange(value);        
    }

	// Event Handlers //////////////////////////////////////////////////////////

	/**
	 * @method onBlockTypeButtonClick
	 * @param {string} buttonType
	 * @param {Event} e
	 * @returns {void}
	 */
	onBlockTypeButtonClick = (buttonType: string, e: Event) => {
		if (e) {
			e.preventDefault();
		}

		const newEditorState = StyleHelpers.toggleBlockType(this.state.editor, buttonType);

		this.updateState({ editor: newEditorState }, () => {
            this.updateValue(this.state.editor);
		});
    };
    
	/**
	 * @method onInlineClick
	 * @param {Event} e
	 * @returns {void}
	 */
	onInlineClick = (styleType: string, e: Event) => {
		if (e) {
			e.preventDefault();
		}

		const selection = this.state.editor.getSelection();
		const options = {
			index: selection.getAnchorOffset(),
			focusIndex: selection.getFocusOffset(),
			blockKey: selection.getAnchorKey(),
			focusBlockKey: selection.getFocusKey(),
			style: styleType
		};
		const newEditorState = StyleHelpers.toggleInlineStyle(this.state.editor, options);

		this.updateState({ editor: newEditorState }, () => {
            this.updateValue(this.state.editor);
		});
	};

	/**
	 * @method onValueChange - Called when the `<TextEditor/>` senses a change
	 * to its value. Gets the content of the editorState and passes it through
	 * the function bound to `this.props.onValueChange()` which will send it up
	 * to the `AngularWrapper`.
	 * @param {EditorState} editorState
	 * @returns {void}
	 */
	onValueChange = (editorState: EditorState) => {
		const cleaned = StyleHelpers.clearInlineStyles(editorState, [
			Constants.StyleKeys.HIGHLIGHT,
			Constants.StyleKeys.HIGHLIGHT_ADVERB,
			Constants.StyleKeys.HIGHLIGHT_PASSIVE,
			Constants.StyleKeys.HIGHLIGHT_TOOWORDY,
			Constants.StyleKeys.HIGHLIGHT_SOTHEREISWEASEL,
			Constants.StyleKeys.HIGHLIGHT_CLICHETOBEILLUSION
		]);
		this.updateState({ editor: cleaned }, () => {
			const highlighted = this.highlightSuggestions(this.state.editor);
			this.updateState({ editor: highlighted }, () => {
                this.updateValue(this.state.editor);
			});
		});
	};

	// Render Assisting Methods ////////////////////////////////////////////////

	// Render //////////////////////////////////////////////////////////////////

	render() {
		return (
			<Ernest
				editor={this.state.editor}
				events={this.getEvents()}
				suggestions={ProseHelpers.getAllSuggestionsForEditorState(this.state.editor)}
			/>
		);
	}
}

module.exports = ErnestLogic;
