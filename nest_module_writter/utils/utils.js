'use strict';
const { pluralize } = require('./pluralization');

const capitalizeText = text => {
	return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const pluralCapitalizedText = text => {
    const pluralizedText = pluralize(text);
    const finalText = pluralizedText.substring(0, pluralizedText.length -1);
	return `${finalText.charAt(0).toUpperCase()}${finalText.slice(1)}`;
};

const lowerCaseText = text => {
    const pluralizedText = pluralize(text);
    const finalText = pluralizedText.substring(0, pluralizedText.length -1);
	return finalText.toLowerCase();
};

const upperCaseText = text => {
	return text.toUpperCase();
};

const lowerCasedSingularText = text => {
	return text.toLowerCase();
};

module.exports = {
    capitalizeText,
    pluralCapitalizedText,
	lowerCaseText,
    upperCaseText,
    lowerCasedSingularText
}
