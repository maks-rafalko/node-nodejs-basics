import { rename as fsRename } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const rename = async () => {
    const originalFile = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newFile = path.join(__dirname, 'files', 'properFilename.md');

    if (!await fileExists(originalFile) || await fileExists(newFile)) {
        throw new Error('FS operation failed');
    }

    await fsRename(originalFile, newFile);
};

await rename();