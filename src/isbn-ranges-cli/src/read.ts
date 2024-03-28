import { createReadStream, type PathLike } from 'node:fs';

const read = (
  path: PathLike,
): Promise<string> => new Promise((resolve, reject) => {
  const stream = createReadStream(path, { encoding: 'utf8' });

  // let message = '';
  const chunks: string[] = [];

  stream.on('data', (chunk: string): void => {
    // message += chunk;
    chunks.push(chunk);
  });

  stream.on('end', (): void => {
    const message = chunks.join('');
    // const message = Buffer.concat(chunks);
    resolve(message);
  });

  stream.on('error', (event: Error): void => {
    reject(event);
  });
});

export {
  read,
};
