import {resolve} from 'path';

export const pathResolve = (dir: string): any => {
  return resolve(__dirname, '..', dir)
}