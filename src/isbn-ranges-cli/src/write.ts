import { createWriteStream, type PathLike } from 'node:fs';

const write = (
  path: PathLike,
  data: string,
): Promise<void> => new Promise((resolve, reject) => {
  const stream = createWriteStream(path);
  stream.on('error', (event: Error): void => {
    reject(event);
  });
  stream.on('finish', (): void => {
    resolve();
  });
  stream.write(data);
  stream.write('\n');
  stream.end();
});

export {
  write,
};
