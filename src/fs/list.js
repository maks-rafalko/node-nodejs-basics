import { readdir } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const list = async () => {
    const dirToScan = path.join(__dirname, 'files');

    if (!await fileExists(dirToScan)) {
        throw new Error('FS operation failed');
    }

    const files = await readdir(dirToScan);

    console.table(files);
};

await list();