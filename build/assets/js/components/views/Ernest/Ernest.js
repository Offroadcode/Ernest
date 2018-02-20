import React from 'react';
import { Editor, EditorState } from 'draft-js';

// utils

import Constants from '../../../utils/Constants';

// components
import Suggestions from './components/Suggestions/Suggestions';
//import TextEditor from './components/TextEditor/TextEditor';
import Toolbar from './components/Toolbar/Toolbar';

const styleMap = {
	HIGHLIGHT: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.LIGHT_GREEN
	},
	HIGHLIGHT_ADVERB: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.ADVERB
	},
	HIGHLIGHT_PASSIVE: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.PASSIVE
	},
	HIGHLIGHT_TOOWORDY: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.TOOWORDY
	},
	HIGHLIGHT_SOTHEREISWEASEL: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.SOTHEREISWEASEL
	},
	HIGHLIGHT_CLICHETOBEILLUSION: {
		backgroundColor: Constants.HIGHLIGHT_COLORS.CLICHETOBEILLUSION
	}
};

/**
 * @class Ernest - The core Ernest view component, which is called by ErnestLogic.
 * @param {object} props
 * @param {function[]} props.event
 * @param {EditorState} props.editor
 * @returns {JSX.Element}
 */
class Ernest extends React.Component {
    constructor (props) {
        super(props);
    }

    // React Lifecycle Methods /////////////////////////////////////////////////
        
    // Helper Functions ////////////////////////////////////////////////////////
    
	// Event Handlers //////////////////////////////////////////////////////////

    /**
     * @method onFocusClick - If the user clicks on the container outside of the 
     * actual editor, focus on the editor.
     * @param {Event} e
     * @returns {void}
     */
    onFocusClick = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.refs.editor.focus();
    }

	// Render Assisting Methods ////////////////////////////////////////////////

	// Render //////////////////////////////////////////////////////////////////    

    render = () => {
        const events = this.props.events;
        const editor = this.props.editor;
        const value = editor ? editor : EditorState.createEmpty();

        return (
            <div className="ernest-container">
                <Toolbar events={events} />
                <div className="text-editor-wrapper" onClick={this.onFocusClick}>
                    <Editor 
                        customStyleMap={styleMap} 
                        editorState={value} 
                        onChange={events.onValueChange} 
                        ref="editor"    
                    />
                </div>
                <Suggestions suggestions={this.props.suggestions} />
            </div>
        );
    }
};

module.exports = Ernest;
