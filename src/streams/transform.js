import { Transform, pipeline } from 'node:stream';

const transform = async () => {
    const readableFromStdin = process.stdin;
    const writableToStdout = process.stdout;

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversedInputString = reverseString(chunk.toString().trim());

            this.push(reversedInputString + '\n');

            callback();
        }
    });

    pipeline(
        readableFromStdin,
        transformStream,
        writableToStdout,
        (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        }
    );
};

const reverseString = (string) => string.split('').reverse().join('');

await transform();