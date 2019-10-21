module.exports = {
  test : /\.scss$/,
  use  : [
    {
      loader: 'fast-sass-loader'
    },
    {
      loader  : 'sass-resources-loader',
      options : {
        resources: 'app/javascript/packs/src/styles/globallyAvailable.scss',
      },
    },
  ],
};
