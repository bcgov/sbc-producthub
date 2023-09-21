# Release Notes

## TLDR


## Tech stacks

### Nuxt 3
Look at the [documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Tailwind CSS
Look at the [documentation](https://tailwindcss.com/) to learn more.

### Firebase
Look at the [documentation](https://firebase.google.com/docs/hosting) to learn more.


## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```
Before running the server, please follow these steps to set up the server for fetching API.

There are 2 key tasks:
1. Get and store the Zenhub API key in .env file
2. Install Apollo Client 

## Prepare for API fetching

### 1. Get Zenhub API Key
1. Go to this website (https://app.zenhub.com/settings/tokens)
2. Choose `Generate new key`
3. Copy the key and store somewhere 
### 2. Add the API key to .env file and stored locally
```bash
touch .env
```
Then open .env file and copy paste this to the file
```
ZENHUB_APIKEY=[API KEY]

# [API KEY] will be replaced with the key retrived above
```
### 3. Install Apollo Client 3
```bash
#npm
npm install --save graphql graphql-tag @apollo/client

#yarn
yarn add graphql graphql-tag @apollo/client
```

For more documentation please visit 

[Zenhub Documentation](https://developers.zenhub.com/graphql-api-docs/getting-started/index.html)

[Apollo Client on Vue.js](https://v4.apollo.vuejs.org/guide/installation.html)

[Apollo Client Usage](https://www.apollographql.com/docs/react/get-started/)

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Linting check
```bash
# npm
npm run lint

# pnpm
pnpm run lint

# yarn
yarn lint
```

## Unit Testing
```bash
# npm
npm run testing

# pnpm
pnpm run testing

# yarn
yarn testing
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
