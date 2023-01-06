import path from 'node:path';
import * as url from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const compress = async () => {
    const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
    const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

    const readableFileStream = createReadStream(fileToCompress);
    const writableFileStream = createWriteStream(compressedFilePath);

    pipeline(readableFileStream, createGzip(), writableFileStream, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
};

await compress();