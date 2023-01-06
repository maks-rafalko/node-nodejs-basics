import { createWriteStream } from 'node:fs';
import path from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const write = async () => {
    const fileToWrite = path.join(__dirname, 'files', 'fileToWrite.txt');

    const readableFromStdin = process.stdin;
    const writableToFile = createWriteStream(fileToWrite);

    readableFromStdin.pipe(writableToFile);
};

await write();