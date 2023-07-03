module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "@react-native-community" //Optional added rule
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        semi: ['error', 'never'],     //All these rules are optional
        'comma-dangle': [1, 'never'],
        'react/jsx-filename-extension': [1, {extensions: ['.js','.jsx'] }],
        'no-use-before-define': [
            'error',
            {functions: true, classes: true, variables: false}
        ] //All these rules are optional
    }
}
/* React Community ESLint config, modified */