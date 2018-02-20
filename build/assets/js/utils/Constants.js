/**
 * @const Constants
 * @description An object containing constant keys for magic strings.
 */
const Constants = {
	BlockTypes: {
		H1: 'header-one',
		H2: 'header-two',
		H3: 'header-three',
		BLOCKQUOTE: 'blockquote',
		UNORDERED_LIST: 'unordered-list-item',
		ORDERED_LIST: 'ordered-list-item'
	},
    DEFAULT_REASON_KEYS: 'passive,illusion,so,thereIs,weasel,adverb,tooWordy,cliches',
    HIGHLIGHT_COLORS: {
        LIGHT_GREEN: 'lightgreen',
        ADVERB: '#c4e3f3',
        PASSIVE: '#c4ed9d',
        TOOWORDY: '#e4b9b9',
        SOTHEREISWEASEL: '#e3b7e8',
        CLICHETOBEILLUSION: '#f7ecb5'
    },
	StyleKeys: {
		BOLD: 'BOLD',
		HIGHLIGHT: 'HIGHLIGHT',
		HIGHLIGHT_ADVERB: 'HIGHLIGHT_ADVERB',
		HIGHLIGHT_PASSIVE: 'HIGHLIGHT_PASSIVE',
		HIGHLIGHT_TOOWORDY: 'HIGHLIGHT_TOOWORDY',
		HIGHLIGHT_SOTHEREISWEASEL: 'HIGHLIGHT_SOTHEREISWEASEL',
		HIGHLIGHT_CLICHETOBEILLUSION: 'HIGHLIGHT_CLICHETOBEILLUSION',
		ITALIC: 'ITALIC'
    }   
};

module.exports = Constants;
