require('dotenv').config();

import express from 'express';
import cors from 'cors';
import moment from 'moment-timezone';
import { routes } from './src/routes';
import { ENV_CONFIG } from './src/env-config';
import { initDatabase } from './src/database/database-config';
import { onError } from './src/util/functions/on-error';

console.log('Initializing...');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

moment.tz.setDefault('UTC');

app.use(routes);

initDatabase();

app.use(onError);

const HOST = ENV_CONFIG.HOST || 'localhost';
const PORT = ENV_CONFIG.PORT || 8080;

const listener = app.listen(PORT, HOST, () => {
    const { address, port } = listener.address() as any;
    console.log(`Running on http://${address}:${port}`);
});
