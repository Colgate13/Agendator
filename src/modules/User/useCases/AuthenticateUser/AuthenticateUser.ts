import { Either, left, right } from "core/logic/Either";
import { IUsersRepository } from "modules/User/repositories/IUsersRepository";
import { InvalidEmailOrPasswordError } from "./Errors/InvalidEmailOrPasswordError";

interface IAuthUserRequest {
  email: string;
  password: string;
}

type IToken = {
  token: string;
}

type AuthenticatorAuthUser = Either< InvalidEmailOrPasswordError , IToken >

export class Authenticator {

  protected userRepository: IUsersRepository;
  
  constructor(UserRepository: IUsersRepository) {
    this.userRepository = UserRepository;
  }

  async authUser({ email, password }: IAuthUserRequest): Promise<AuthenticatorAuthUser> {
    const userTryAuth = await this.userRepository.findByEmail(email);

    if (!userTryAuth) {
      return left(new InvalidEmailOrPasswordError());
    }

    if (await userTryAuth.props.password.comparePassword(password)) {

      return right({
        token: 'mama'
      })

    }

    return left(new InvalidEmailOrPasswordError());
  }
  
  
}