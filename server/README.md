# OnBoard Project: User CRUD

## Description

This is a training project that allows an intern to develop their skills in specific technologies and learn the day-a-day workflow at Taqtile. This project focuses on constructing an API featuring a simple CRUD for users employing many technologies, which are described in the following.

## Environment and tools

Basically, the main technologies employed in this project are:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://github.com/typeorm/typeorm)

First, it is necessary to install and configure Node.js **15.8.0** (via [nvm](https://github.com/nvm-sh/nvm)) and Docker. Then, just clone this repo and, inside the project folder, install all packages by running:

```sh
npm install
```

Thereafter, it is necessary to initialize the databases, which can be done by running:

```sh
docker-compose up -d
```

In addition, there are some useful tools that can be used for many purposes. For example, in order to keep the code clean, readable, and correct, installing [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions in your VSCode is a good choice. Furthermore, managing databases may be easier when using software such as [DBeaver](https://dbeaver.io/) or [TablePlus](https://tableplus.com/), just choose whatever you prefer.

## Running and debugging

After configuring everything, it is possible to run the project. Just run the `start:dev` script using VSCode or run:

```sh
npm run start:dev
```

## Building

To build this project in a `/dist` folder, run the `build` script using VSCode or run:

```sh
npm run build
```

From that, it is possible to start the built project with only the necessary dependencies and already compiled codes. To do that, run the `start` script using VSCode or run:

```sh
npm run start
```

## Testing

To do
