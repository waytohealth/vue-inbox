// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
// };

const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      // Always transpile optional chaining/nullish coalescing
      include: [
        /(optional-chaining|nullish-coalescing)/
      ],
    },
  ],
];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};