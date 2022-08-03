# CMS+ Frontend side

## What is this?

CMS system - frontend side

## How to run?

CMS+ requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies

```sh
yarn
```

Start development server

```sh
yarn start
```

## Build

Setup env - Please refer .example.env
```sh
cp .env.example .production.env
```

For production

```sh
docker build --build-arg ENV=production -t "cmsfe" --no-cache .
```

## License

MIT

**Free Software, Hell Yeah!**