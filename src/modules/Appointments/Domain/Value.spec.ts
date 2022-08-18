import { Value } from './Value';
import { InvalidValue } from './Errors/InvalidValue';

describe('Test Appointments-Value', () => {
  it('should be a create Value isRight', () => {
    const value = Value.create(80.66);

    if (value.isLeft()) {
      console.log();
      throw Error(`value invalid ${value.value.message}`);
    }
    
    expect(value.value).toBeInstanceOf(Value);
    expect(value.value.value).toEqual(80.66);

  });

  it('should be a NOT create Value isLeft', () => {

    const value = Value.create(-80.66);

    if (value.isRight()) {
      throw Error(`value valid`);
    }



    expect(value.value).toBeInstanceOf(InvalidValue)
    expect(value.value.message).toEqual("CoreError > This Valor less 0")

  });
});
