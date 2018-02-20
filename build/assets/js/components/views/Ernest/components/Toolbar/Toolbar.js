import React from 'react';

// utils

import Constants from '../../../../../utils/Constants';

/**
 * @const Toolbar - The toolbar of buttons for the editor.
 * @param {object} props
 * @param {function[]} props.events
 * @returns {JSX.Element}
 */
const Toolbar = (props) => {
	const events = props.events;

	return (
		<div className="toolbar">
			<button
				type="button"
				onClick={events.onInlineClick.bind(this, Constants.StyleKeys.BOLD)}
			>
				Bold
			</button>
			<button
				type="button"
				onClick={events.onInlineClick.bind(this, Constants.StyleKeys.ITALIC)}
			>
				Italic
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(this, Constants.BlockTypes.H1)}
			>
				H1
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(this, Constants.BlockTypes.H2)}
			>
				H2
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(this, Constants.BlockTypes.H3)}
			>
				H3
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(this, Constants.BlockTypes.BLOCKQUOTE)}
			>
				Quote
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(
					this,
					Constants.BlockTypes.UNORDERED_LIST
				)}
			>
				Bullets
			</button>
			<button
				type="button"
				onClick={events.onBlockTypeButtonClick.bind(
					this,
					Constants.BlockTypes.ORDERED_LIST
				)}
			>
				Numbers
			</button>
		</div>
	);
};

module.exports = Toolbar;
