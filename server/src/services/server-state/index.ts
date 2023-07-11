import Docker from 'dockerode';
import {ServerStates, DockerContainerStates} from '../../types/server-state/index';
import os from 'os';
import path from 'path';

import dotenv from 'dotenv';

const docker = new Docker();

class ServerStateService {
  declare _serverContainer: Docker.ContainerInfo;

  private get serverDir() {
    return os.homedir();
  }

  public get serverContainer () {
    return this._serverContainer || undefined;
  }

  constructor() {
    const timer = 1000 * 15;
    setInterval(() => {
      this.listContainers();
    }, timer)


    setInterval(() => {
      this.getStatusContainer().then((state) => console.log(state))
    }, 1000 * 20)
  }

  public async getStatusContainer() {
    const container = this.serverContainer;

    if (!container) {
      return {state: ServerStates.OFFLINE}
    }

    switch (container.State) {
      case DockerContainerStates.RUNNING : {
        return this.getStatusServer();
      }
      case DockerContainerStates.CREATED :
      case DockerContainerStates.RESTARTING :
      case DockerContainerStates.PAUSED : {
        return {state: ServerStates.PENDING}
      }
      case DockerContainerStates.REMOVING :
      case DockerContainerStates.EXITED :
      case DockerContainerStates.DEAD :
      default: {
        return {state: ServerStates.OFFLINE}
      }
    }
  }

  public async getStatusServer() {
    dotenv
    // const serverStatePath = process.env.ServerStates || '';
  
    console.log(this.serverDir, path.resolve(this.serverDir));
  }

  private listContainers() {
    docker.listContainers((err, containers) => this.findContainer(err, containers || []));
  }

  private findContainer = (err: any, containers: Docker.ContainerInfo[]) => {
    if (err) {
      // console.error('Ошибка при получении списка контейнеров:', err);
      return;
    }

    containers?.forEach( (containerInfo) => {
      if (containerInfo.Names.includes('/grimheim-valheim-1')) {
        // console.log('Server container is :: ', containerInfo);
        this._serverContainer = containerInfo;
      }
    });
  };
}

export default new ServerStateService();
