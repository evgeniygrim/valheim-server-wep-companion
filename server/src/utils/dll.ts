/**
 *  requred mono-utils_4.2.1, on ubuntu install :
 *  $: sudo apt install mono-utils
 */

import path from "path";

const { exec } = require('child_process');

export interface DLLInfoInterface {
  dll: string,
  version: string,
  originName: string,
  name: string,
}

export default function getDllVersion(dll: string, modspath: string) {
  return new Promise<DLLInfoInterface>((resolve, reject) => {
    const  filePath = path.resolve(modspath + '/' + dll);
    const command =  `monodis --assembly ${filePath} | grep Version`;
    if (!dll.match(/\.dll$/)) {
      return reject('isnt Dll');
    }
    exec(command, (error: any, stdout: any) => {
      if (error) {
        reject(error);
        return;
      }

      const versionMatch = stdout.match(/Version: (.+)/);
      if (versionMatch && versionMatch[1]) {
        const originName = dll?.replaceAll(".dll", "")
        const name = originName
          .replaceAll("_", " ")

        const info = {
          dll,
          name,
          originName,
          version: versionMatch[1].trim(),
        }
        resolve(info);
      } else {
        reject(new Error('Failed to retrieve DLL version.'));
      }
    });
  });
}