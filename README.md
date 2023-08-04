# js-habitify-api

[![npm version](https://badge.fury.io/js/habitify-api.svg)](https://badge.fury.io/js/habitify-api)
[![codecov](https://codecov.io/gh/kitsuyui/js-habitify-api/branch/main/graph/badge.svg?token=PICSCVEEKZ)](https://codecov.io/gh/kitsuyui/js-habitify-api)
[![test](https://github.com/kitsuyui/js-habitify-api/actions/workflows/test.yml/badge.svg)](https://github.com/kitsuyui/js-habitify-api/actions/workflows/test.yml)

Unofficial [Habitify](https://www.habitify.me/) API client for JavaScript.
API Docs: https://docs.habitify.me/

## Usage

### Installation

#### yarn

```sh
yarn add habitify-api
```

#### npm

```sh
npm install habitify-api
```

### Example

```js
import { Client } from 'habitify-api'
// const client = Client.create('...')  // You can initialize client with token
const client = Client.getClientFromEnv() // Or get client from environment variables HABITIFY_API_TOKEN
// https://docs.habitify.me/date-format
const data = await client.fetchJournal('2023-07-25T00:00:00+09:00') // fetch journal of 2023-07-25
console.log(data)
```

### Build

```sh
yarn build
```

### Run with development mode (watch mode)

```sh
yarn dev
```

## Test

```sh
yarn test
```

## License

MIT
