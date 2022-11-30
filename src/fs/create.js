import { writeFile } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const create = async () => {
    const filePath = __dirname + 'files/fresh.txt';

    const isFileExists = await fileExists(filePath);

    if (isFileExists) {
        throw new Error('FS operation failed');
    }

    await writeFile(filePath, 'I am fresh and young')
};

await create();