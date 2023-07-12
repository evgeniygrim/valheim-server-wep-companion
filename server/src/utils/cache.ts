export interface DataCacheInterface<T> {
  entry: T,
  stamp: Date,
}

export class DataCache<T = any> implements DataCacheInterface<T> {
  public get entry() {
    return this.data.entry;
  }
  public get stamp() {
    return this.data.stamp;
  }
  public timeLimit = 1000 * 5;

  private data: DataCacheInterface<T> = {
    entry: null as T,
    stamp: new Date(),
  }

  constructor (entity: T, timeLimit: number) {
    this.timeLimit = timeLimit;
    this.data.entry = entity;
    this.data.stamp = new Date();
  }

  public get() {
    return this.entry;
  }

  public async update(fn: () => Promise<T>) {
    if (DataCache.checkStamp(this.stamp, this.timeLimit)) {
      return this.entry;
    }

    this._update(await fn())
    return this.entry;
  }

  static checkStamp(stamp: Date, limit: number) {
    const now = new Date().getTime();

    return ((stamp.getTime() - now) < limit)
  }

  private _update(entity: T) {
    this.data.entry = entity;
    this.data.stamp = new Date()
  }
}