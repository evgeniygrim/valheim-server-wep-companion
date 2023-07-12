import path from "path";
import { AppConfig } from "../../types/config";
import { exec } from "child_process";
import { default as fsAsync } from "fs/promises";

const appLogCredits = `
  # app.log


`

class LoggerService {
  declare logPath: string;
  private buffer: string = '';

  init(config: AppConfig) {
    this.logPath = path.resolve(config.rootDir + '/logs/app.log');
  }

  log(message: string, type?: string, code?: number, user?: string) {
    const time = new Date().toISOString();
    const buffer = `${time} | user: ${user || 'Server'} [ ${type || 'OK'} ${code ? '' : ' : ' + code } ] :: ${message}`
    this.write(buffer);
    if (code && code > 200) {
      console.error(buffer)
    } else {
      console.log(buffer)
    }
  }

  private async write (buffer: string) {
    try {
      if (!await this.access()) {
        await this.create();
      }
      exec(`echo -e "${buffer}\n" >> ${this.logPath}`)
      

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