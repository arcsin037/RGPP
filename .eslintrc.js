module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "babel"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": [
            "error", {
                allow: ["log", "warn", "error"]
            }
        ],
        "arrow-body-style": 2,
        "arrow-parens": 2,
        "arrow-spacing": 2,
        "constructor-super": 2,
        "generator-star-spacing": 2,
        "no-class-assign": 2,
        "no-confusing-arrow": 2,
        "no-const-assign": 2,
        "no-dupe-class-members": 2,
        "no-duplicate-imports": 2,
        "no-new-symbol": 2,
        "no-restricted-imports": 2,
        "no-this-before-super": 2,
        "no-useless-computed-key": 2,
        "no-useless-constructor": 2,
        "no-var": 2,
        "object-shorthand": 2,
        "prefer-arrow-callback": 2,
        "prefer-const": 2,
        "prefer-reflect": 2,
        "prefer-rest-params": 2,
        "prefer-spread": 2,
        "prefer-template": 2,
        "require-yield": 2,
        "sort-imports": 2,
        "template-curly-spacing": 2,
        "yield-star-spacing": 2,
        "babel/generator-star-spacing": 2,
        "babel/new-cap": 2,
        "babel/array-bracket-spacing": 2,
        "babel/object-curly-spacing": 2,
        "babel/object-shorthand": 2,
        "babel/arrow-parens": 2,
        "babel/no-await-in-loop": 2,
        "babel/flow-object-type": 2
    },
    "globals": {
        "describe": false,
        "it": false,
        "before": false
    }
};
