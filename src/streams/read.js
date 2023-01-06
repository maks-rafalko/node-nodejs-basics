import { createReadStream } from 'node:fs';
import path from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const read = async () => {
    const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');

    const readableStream = createReadStream(fileToRead);

    readableStream.pipe(process.stdout);
};

await read();