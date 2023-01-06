import path from 'node:path';
import * as url from 'node:url';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const decompress = async () => {
    const fileToUnCompress = path.join(__dirname, 'files', 'archive.gz');
    const unCompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

    const readableFileStream = createReadStream(fileToUnCompress);
    const writableFileStream = createWriteStream(unCompressedFilePath);

    pipeline(readableFileStream, createGunzip(), writableFileStream, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
};

await decompress();