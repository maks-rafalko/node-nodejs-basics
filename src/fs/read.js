import { readFile } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const read = async () => {
    const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');

    if (!await fileExists(fileToRead)) {
        throw new Error('FS operation failed');
    }

    const contents = await readFile(fileToRead, { encoding: 'utf8' });

    console.log(contents);
};

await read();