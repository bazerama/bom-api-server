module.exports = {
    env: {
        mocha: true,
        node: true
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 8
    },
    rules: {
        'no-console': 0,
        'no-underscore-dangle': 0,
        'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
        'no-use-before-define': ['error', { 'variables': false }],
        'no-multi-str': 0,
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
