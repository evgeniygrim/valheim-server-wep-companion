import { update } from '../../../../client/src/api/users';
import Docker from "dockerode";
import {
  ServerStates,
  DockerContainerStates,
  ServerStatus,
} from "../../types/server-state/index";
import os from "os";
import path from "path";
import { AppConfig } from "../../types/config";
import { promises as fsAsync } from "fs";
import { default as getDllInfo, DLLInfoInterface } from "../../utils/dll";
import { default as createZip, ModPackInterface} from '../../utils/mod-pack';
import {DataCache} from '../../utils/cache';
import {getSeconds} from '../../utils/time';

class GameServerService {
  declare docker: Docker;
  declare _serverContainer: Docker.ContainerInfo;
  declare modsPath: string;
  declare statusPath: string;
  declare containerName: string;
  declare watcher: NodeJS.Timer;

  private status: DataCache<ServerStatus> = new DataCache<ServerStatus>({ state: ServerStates.OFFLINE }, getSeconds(15));
  private modPack: DataCache<ModPackInterface> = new DataCache<ModPackInterface>({} as any, getSeconds(10));
  private modList: DataCache<DLLInfoInterface[]> = new DataCache<DLLInfoInterface[]>([] as any[], getSeconds(10));

  public get serverContainer() {
    return this._serverContainer || undefined;
  }

  constructor() {
    this.docker = new Docker();
  }

  init(config: AppConfig) {
    this.modsPath = path.resolve(os.homedir() + config.mods);
    this.statusPath = path.resolve(os.homedir() + config.state);
    this.containerName = config.container || "";

    this.watcher = this.watchContainer();
    this.getModPack().then((res) => console.log("res :: ", res));
  }

  public async getModsList() {
    try {
      const files = new Set(await fsAsync.readdir(this.modsPath));

      return this.getModsVersion(Array.from(files));
    } catch (err) {
      throw err;
    }
  }

  public async getModPack() {
    try {
      const list = await this.getModsList();
      return this.modPack.update(async () => await createZip(list.map(item => item.dll), this.modsPath));
    } catch (err) {

    }
  }

  public async getModsVersion(names: string[]) {
    const promises = names.map((name) => {
      return getDllInfo(name, this.modsPath).catch(() => null);
    });

    return this.modList.update(async () => await Promise.all(promises).then((list) => list.filter(Boolean) as DLLInfoInterface[]))
  }

  public async getStatusContainer() {
    const container = this.serverContainer;

    if (!container) {
      return this.status.entry;
    }

    switch (container.State) {
      case DockerContainerStates.RUNNING: {
        return this.getStatusServer();
      }
      case DockerContainerStates.CREATED:
      case DockerContainerStates.RESTARTING:
      case DockerContainerStates.PAUSED: {
        return { state: ServerStates.PENDING };
      }
      case DockerContainerStates.REMOVING:
      case DockerContainerStates.EXITED:
      case DockerContainerStates.DEAD:
      default: {
        return this.status.entry;;
      }
    }
  }

  public async getStatusServer(): Promise<Partial<ServerStatus>> {
    try {
      return this.status.update(async () => {
        const fromFile = await fsAsync.readFile(this.statusPath, "utf-8")
        const status = JSON.parse(fromFile) as ServerStatus;

        if (status.game_id) {
          return {
            ...status,
            state: ServerStates.ONLINE,
          }
        } else {
          return { state: ServerStates.OFFLINE }
        }
      });
    } catch (error) {
      return this.status.update(() => Promise.resolve({ state: ServerStates.OFFLINE }))
    }
  }

  private watchContainer() {
    if (this.watcher) {
      clearInterval(this.watcher);
    }

    const timer = getSeconds(10);

    return setInterval(() => {
      this.getContainer();
    }, timer);
  }

  private getContainer() {
    this.docker.listContainers((err, containers) =>
      this.findContainer(err, containers || [])
    );
  }

  private findContainer = (err: any, containers: Docker.ContainerInfo[]) => {
    if (err || !this.containerName) {
      return;
    }

    containers?.forEach((containerInfo) => {
      if (containerInfo.Names.includes(this.containerName)) {
        this._serverContainer = containerInfo;
      }
    });
  };
}

export default new GameServerService();
