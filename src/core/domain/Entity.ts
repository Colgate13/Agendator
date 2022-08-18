import { uidCreate } from '../../shared/Utils/uid';

export class Entity<T> {
  public readonly _id: string;
  public readonly props: T;

  constructor(Props: T, id?: string) {
    this._id = id || uidCreate();
    this.props = Props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id === object._id;
  }
}
