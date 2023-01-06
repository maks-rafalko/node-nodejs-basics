import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sha256AsHex = (content) => createHash('sha256').update(content).digest('hex');

const calculateHash = async () => {
    const fileName = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const fileBuffer = await readFile(fileName);

    const hex = sha256AsHex(fileBuffer);

    console.log(hex);
};

await calculateHash();