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

Other wise will be running in API mode with mongo and you should set the mongo url in the `.env` file by ecxample:

```bash
MONGO_URL=mongodb://localhost:27017/planning-poker
```
