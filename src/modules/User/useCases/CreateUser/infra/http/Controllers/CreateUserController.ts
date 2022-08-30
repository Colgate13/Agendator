import { Response, Request } from 'express';
import { PrismaUsersRepository } from '../../../../../repositories/prisma/UsersRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { CreateUser, ICreateUser } from '../../../createUser';

export default class CreateUserController {

  private createUsersService: CreateUser;

  constructor(CreateUserProps = CreateUser, UserRepository = PrismaUsersRepository) {
    this.createUsersService = new CreateUserProps(new UserRepository)
  }

  public async execute(
    request: Request,
    response: Response,
  ) {
    console.log("here123")

    const bodyParams: ICreateUser = request.body;
    
    if (!bodyParams) {
      return new AppError(`Your request Body is invalid`);
    }
    if (bodyParams.email) {
      return new AppError(`Email is proprety required ${bodyParams.email}`);
    }
    if (bodyParams.password) {
      return new AppError(`Password is proprety required ${bodyParams.password}`);
    }
    if (bodyParams.username) {
      return new AppError(`Username is proprety required ${bodyParams.username}`);
    }

    const { email, password, username } = bodyParams;

    const result = await this.createUsersService.create({
      email,
      password,
      username
    });

    console.log("here")

    if (result.isLeft()) {
      return new AppError(`Username is proprety required ${bodyParams.username}`);
    }

    return response.json(result.value.user);

  }
}