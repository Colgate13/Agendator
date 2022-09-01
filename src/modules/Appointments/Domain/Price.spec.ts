import { Price } from './Price';
import { InvalidPrice } from './errors/InvalidPrice';

describe('Test Appointments-Value', () => {
  it('should be a create Value isRight', () => {
    const price = Price.create(80.66);

    if (price.isLeft()) {
      throw Error(`Price invalid ${price.value.message}`);
    }
    
    expect(price.value).toBeInstanceOf(Price);
    expect(price.value.price).toEqual(80.66);

  });

  it('should be a NOT create Price isLeft', () => {

    const price = Price.create(-80.66);

    if (price.isRight()) {
      throw Error(`Price valid`);
    }

    expect(price.value).toBeInstanceOf(InvalidPrice)
    expect(price.value.message).toEqual("CoreError > This Valor less 0")

  });
});
