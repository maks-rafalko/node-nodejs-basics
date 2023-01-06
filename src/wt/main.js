import { Worker } from 'node:worker_threads';
import * as url from 'node:url';
import path from 'node:path';
import os from 'node:os';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const performCalculations = async () => {
    const numberOfCpus = os.cpus().length;
    const workerPromises = [];

    for (let cpuIndex = 0; cpuIndex < numberOfCpus; cpuIndex++) {
        workerPromises.push(createWorkerPromise(cpuIndex));
    }

    Promise.all(workerPromises).then(printWorkersResults)
};

const createWorkerPromise = (workerIndex) => {
    const workerPath = path.join(__dirname, 'worker.js');

    return (new Promise((resolve, reject) => {
            const worker = new Worker(workerPath, {workerData: 10 + workerIndex});

            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        }))
        .then((workerMessage) => {
            return {
                status: 'resolved',
                data: workerMessage.calculatedResult,
            }
        })
        .catch(() => {
            return {
                status: 'error',
                data: null,
            };
        });
}

const printWorkersResults = (allWorkersResults) => {
    console.log(allWorkersResults);
}

await performCalculations();