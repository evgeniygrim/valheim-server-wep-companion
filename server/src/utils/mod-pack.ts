import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import { randomUUID } from 'crypto';

export interface ModPackInterface {
  zip: Buffer,
  name: string,
  meta: string,
}

export default async function create(files: string[], dir: string) {

  const zipName = randomUUID() + '.zip'
  const output = fs.createWriteStream(zipName);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);

  files.forEach((file) => {
    const filePath = path.resolve(dir + '/' + file)
    archive.file(filePath, { name: file });
  });

  await archive.finalize();

  const zipData = await fs.promises.readFile(zipName);

  await fs.promises.unlink(zipName);

  return {
    zip: zipData,
    name: 'plugins.zip',
    meta: 'application/zip',
  } as ModPackInterface;
}