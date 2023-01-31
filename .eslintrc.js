module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 2
      },
    }],
    "vue/eqeqeq": ["warn", "always"],
    "eqeqeq": ["warn", "always"],
    "vue/no-undef-properties": ["error"]
  }
}