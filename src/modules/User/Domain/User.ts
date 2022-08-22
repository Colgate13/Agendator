import { Entity } from '../../../core/domain/Entity';
import { Either, right } from '../../../core/logic/Either';
import { InvalidEmailError } from './Errors/InvalidEmailError';
import { InvalidPassword } from './Errors/invalidPasswordError';
import { IUser } from './IUser';

export class User extends Entity<IUser> {
  get uid(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email.value;
  }

  get password(): string {
    return this.props.password.value;
  }


  private constructor(UserProps: IUser, uid?: string) {
    super(UserProps, uid);
  }

  static create(
    UserProps: IUser,
    uid?: string,
  ): Either<InvalidEmailError | InvalidPassword, User> {
    const user = new User(UserProps, uid);
    
    return right(user);
  }
}
