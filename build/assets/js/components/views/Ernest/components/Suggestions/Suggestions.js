import React from 'react';

/**
 * @method Suggestions
 * @param {JSON} props
 * @returns {JSX.Element}
 */
const Suggestions = (props) => {
	const suggestions = props.suggestions.map(function(suggestion, index) {
		return (
			<li className={'suggestion ' + suggestion.type} key={'suggestion-' + index}>
				{suggestion.reason}
			</li>
		);
	});

	return <ul className="prose-suggestions-list">{suggestions}</ul>;
};

module.exports = Suggestions;
