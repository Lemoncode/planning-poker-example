# Scaffolding Express Typescript

## Steps

- Run install

```bash
npm install
```

- Create `.env` file with same `.env.example` value.

- Run development start:

```bash
npm start
```

- Run debug start:

```bash
npm run start:debug
```

- And run .vscode/launch.json

## Run application APLI mode(mongodb) or Mock mode(localstorage)

To run in mock mode you should modify the file `.env` setting the:

```bash
API_MOCK=true
```

- OR

```bash
npm run start:mock
```

Other wise will be running in API mode with mongo. If you check the script start in the `package.json` you will see that, `start` will execute `start:local-db` which execute the docker-compose.

You should have installed in your machine Docker. [Install docker](https://docs.docker.com/get-docker/ 'Docker documentation')

```bash
npm run start
```

-You should set the mongo url in the `.env` file by example:

```bash
MONGO_URL=mongodb://localhost:27017/task-planning
```
