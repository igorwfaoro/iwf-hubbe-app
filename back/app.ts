require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { routes } from './src/routes';
import { onError } from './src/util/functions/on-error';
import { ENV } from './src/env';

console.log('Initializing...');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.use(onError);

const HOST = ENV.HOST || 'localhost';
const PORT = ENV.PORT || 3333;

const listener = app.listen(PORT, HOST, () => {
    const { address, port } = listener.address() as any;
    console.log(`Running on http://${address}:${port}`);
});
