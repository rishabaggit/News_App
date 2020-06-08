module.exports = {
	'parser': 'babel-eslint',
	'parserOptions': {
		'sourceType': 'module',
		'allowImportExportEverywhere': false,
		'codeFrame': true
	},
	'env': {
		'browser': true,
		'node' : true,
		'es6': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'no-unused-vars': [2, {'vars': 'local', 'args': 'none'}],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
        
	}
};