// Excluded words for capitalisation
const excludedWords = [
	'a',
	'an',
	'and',
	'as',
	'at',
	'but',
	'by',
	'for',
	'from',
	'in',
	'into',
	'of',
	'on',
	'onto',
	'or',
	'so',
	'the',
	'to',
	'up',
	'with'
];

const uppercaseWords = [
	"GPT",
	"RPS",
	"GH"
];

export function formatRepoName(repoName) {
	// Capitalise the first letter of each word,
	// except for the excluded words
	// and the first word
	// or if there is only one word
	repoName = repoName.replace(/-/g, ' ');;
	const words = repoName.split(' ');

	if (words.length === 1) {
		return repoName;
	}

	for (let i = 0; i < words.length; i++) {
		if (uppercaseWords.includes(words[i].toUpperCase())) {
			words[i] = words[i].toUpperCase();
			continue;
		}

		if (i === 0 || !excludedWords.includes(words[i])) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
	}

	return words.join(' ');
}