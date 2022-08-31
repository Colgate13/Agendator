import { InvalidPassword } from './suporte/invalidPasswordError';
import { Password } from './Password';
import { comparePassword, hashedPassword } from '../../../shared/Utils/PassCrypt';

describe('Test Password', () => {
  it('should be a create Password isRight', () => {
    const password = Password.create('84656505');

    if (password.isLeft()) {
      throw Error('Password invalid');
    }

    expect(password.value.value).toEqual('84656505');
  });

  it('should be a not create Password isRight', () => {
    const password = Password.create('846');

    if (password.isRight()) {
      throw Error('Password valid');
    }

    expect(password.value).toBeInstanceOf(InvalidPassword);
    expect(password.value).toBeInstanceOf(InvalidPassword);
  });

  it('should be a comparePassword isRight and comparePassword hashedPassword isRight', async () => {
    const passwordToTest = '8656505';
    const password = Password.create(passwordToTest);

    if (password.isLeft()) {
      throw new Error('Password invalid');
    }
    expect(await password.value.comparePassword(passwordToTest)).toEqual(true);

    await password.value.setHashPassword();

    expect(await password.value.comparePassword(passwordToTest)).toEqual(true);
  });

  it('should be a create Hash in password hashed = true isRight', async () => {
    const passwordToTest = '8656505';
    const password = Password.create(passwordToTest, true);

    if (password.isLeft()) {
      throw new Error('Password invalid');
    }
    expect(await password.value.getHashedValue()).toEqual(passwordToTest);
  });
});
