import { constants, readdir, copyFile, mkdir } from 'node:fs/promises';
import * as url from 'node:url';
import { fileExists } from './fsFunctions.js';
import path from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const copy = async () => {
    const fromDir  = __dirname + 'files';
    const toDir = __dirname + 'files_copy';

    if (!await fileExists(fromDir)) {
        throw new Error('FS operation failed');
    }

    if (await fileExists(toDir)) {
        throw new Error('FS operation failed');
    }

    await mkdir(toDir);

    const files = await readdir(fromDir);

    for (const file of files) {
        copyFile(path.join(fromDir, file), path.join(toDir, file), constants.COPYFILE_EXCL);
    }
};

await copy();
