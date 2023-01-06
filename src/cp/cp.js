import * as url from 'node:url';
import path from 'node:path';
import { fork } from 'node:child_process';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const spawnChildProcess = async (args) => {
    const processPath = path.join(__dirname, 'files', 'script.js');

    fork(processPath, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
};

spawnChildProcess(['firstArg', 'secondArg']);