import { User, UserListQuery } from "../../types/users"
import {read, write, createUser} from '../../scripts/users';

class UserService {
  public users = new Map<User['id'], User>();
  
  private async read() {
    try {
      const users = await read();
      if (users) {
        users.forEach((user, index) => {
          this.users.set(user.id, {...user, sequence: index},);
        })
        return true;
      }
      return false;
    } catch(error) {
      return error;
    }
  }

  private async write(users: Map<User['id'], User>) {
    const array = Array.from(users.values());
    try {
      await write(array);
      await this.read();
      return true;
    } catch(error) {
      return error;
    }
  }

  has(id: User['id']) {
    return this.users.has(id)
  }

  init() {
    this.read();
  }

  getAll = ({from, to}: Partial<UserListQuery>) => {
    from = Number(from) || 0;
    to = Number(to) || 100;
    const keys = Array.from(this.users.keys());

    if (from < 0) {
      to = to + Math.abs(from);
      from = 0;
    }

    const resolveKeys = keys.slice(from, to);

    return new Promise((resolve) => {
      const list = resolveKeys.map((key) => {
        const user = this.users.get(key);

        if (!user) {
          return undefined;
        }

        return {
          id: user.id,
          fullName: `${user.firstName} ${user.middleName} ${user.lastName}`,
          state: user.state,
          sequence: user.sequence,
        }
      })
      .filter(Boolean);

      resolve({list, from, to});
    })
  }
  get = (userId: User['id']) => {
    if (!userId) {
      return Promise.reject({message: 'Пользователь не найден', code: 404});
    }

    return new Promise((resolve) => {
      resolve(this.users.get(userId) || null);
    })
  }
  create = async (user: Partial<User>) => {
    if (this.has(user.id || '')) {
      return Promise.reject({message: 'Пользователь уже существует', code: 401});
    }
    const update = createUser({...user, id: undefined});
    const cache = new Map(this.users);
    cache.set(update.id, update);

    try {
      return await this.write(cache).then(() => update);
    } catch(error) {
      return error;
    }
  }
  update = async (user: Partial<User>) => {
    if (!user.id) {
      return Promise.reject({message: 'Пользователь не найден', code: 404});
    }
    const cache = new Map(this.users);
    const current = cache.get(user.id);
    const update = Object.assign({}, current, user)
    
    if (current) {
      cache.set(user.id, update)
    } else {
      return Promise.reject({message: 'Пользователь не найден', code: 404});
    }

    try {
      return await this.write(cache).then(() => update);
    } catch(error) {
      return error;
    }
  }
  remove = async (useId: User['id']) => {
    if (!useId) {
      return Promise.reject({message: 'Пользователь не найден', code: 404});
    }
    const cache = new Map(this.users);
    const current = cache.get(useId);
    
    if (current) {
      cache.delete(useId)
    } else {
      return Promise.reject({message: 'Пользователь не найден', code: 404});
    }

    try {
      await this.write(cache).then(() => true);
    } catch(error) {
      return error;
    }
  }
}

export default new UserService();