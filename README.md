# Static HTML pages with Webpack

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/guillaumebriday)

## Features

- Write modern CSS with [PostCSS](https://postcss.org/) and [SCSS](https://sass-lang.com/)
- Write modern JS with [Babel](https://babeljs.io/) and [Vue](https://vuejs.org/)
- Preconfigured [TailwindCSS](https://tailwindcss.com/) for rapidly building custom designs
- Automatic copying of [Pug](https://github.com/pugjs/pug) templates and static assets from `src` to `dist` folders
- Linter for scripts
- Hot reload with `webpack-dev-server`
- Build transpiled, bundled, autoprefixed, minificated and compressed files for `production`
- Support environment variables in `.env` file
- Remove unused CSS with [PurgeCSS](https://purgecss.com/)

## Usage

- Write all your ES2015+ Javascript code in src/js` and SCSS styling in `src/style``. Store static files in `public`.
- Every Pug pages in `src/views` will generate an html page with the same name.

### In development

Start the webpack-dev-server on `http://localhost:8080`:
```bash
$ yarn hot
```

Build the application in development mode:
```bash
$ yarn development
```

Recompile whenever files change:
```bash
$ yarn watch
```

Lint your code:
```bash
$ yarn lint
```

### In production

Prepare the app for production in `dist` folder:
```bash
$ yarn production
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the MIT license.
