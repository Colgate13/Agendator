import { Email } from '@modules/User/Domain/Email';
import { Password } from '@modules/User/Domain/Password';
import { User } from '@modules/User/Domain/User';


const email = Email.create('gabreilbarros13@gmail.com');
const password = Password.create('84656505');

if (email.isLeft()) {
  throw Error('Email invalid');
}

if (password.isLeft()) {
  throw Error('Password invalid');
}

const user = User.create({
  email: email.value,
  password: password.value,
  username: 'Gabriel',
});

console.log(user)

console.log('Project com NODE e Typescript configuration');
