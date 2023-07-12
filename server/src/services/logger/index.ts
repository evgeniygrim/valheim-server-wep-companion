import path from "path";
import { AppConfig } from "../../types/config";
import { exec } from "child_process";
import { default as fsAsync } from "fs/promises";

const appLogCredits = 
`# =============
# app.log
# =============

`

class LoggerService {
  declare private inited: boolean;
  declare logPath: string;
  private buffer: string = '';

  init(config: AppConfig) {
    if (this.inited) {
      return false;
    }
    this.logPath = path.resolve(config.rootDir + '/logs/app.log');
    this.inited = true;
  }

  log(message: string, type?: string, code?: number, user?: string, data?: any) {
    const time = new Date().toISOString();
    const codeString = code == 0 || Boolean(code) ?  ' : ' + code : '';
    const buffer = `${time} | as user: ${user || 'Server'} [ ${type || 'OK'}${ codeString } ] ${message}`
    this.write(buffer);
    if (code && code > 200) {
      console.error(buffer, data || '', '\n')
    } else {
      console.log(buffer, data || '', '\n')
    }
  }

  private async write (buffer: string) {
    try {
      if (!await this.access()) {
        await this.create();
      }
      exec(`echo "${buffer}\n" >> ${this.logPath}`)
      
    } catch {
      this.buffer = this.buffer + '\n' + buffer;
    }
  }

  async access() {
    if (!this.logPath) {
      return false;
    }
    return await fsAsync.access(this.logPath).then(() => true).catch(() => false);
  }

  async create() {
    if (this.logPath) {
      return await fsAsync.writeFile(this.logPath, appLogCredits, 'utf8').finally(() => this.buffer = '');
    } else {
      throw 'log file undefined';
    }
  }
}

export default new LoggerService();