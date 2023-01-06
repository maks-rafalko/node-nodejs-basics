import { rm } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const remove = async () => {
    const fileToRemove = path.join(__dirname, 'files', 'fileToRemove.txt');

    if (!await fileExists(fileToRemove)) {
        throw new Error('FS operation failed');
    }

    await rm(fileToRemove);
};

await remove();