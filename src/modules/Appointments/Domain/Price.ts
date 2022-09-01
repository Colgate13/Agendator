import { Either, left, right } from '../../../core/logic/Either';
import { InvalidPrice } from './errors/InvalidPrice';

export class Price {
  public price: number;

  private constructor(Price: number) {
    this.price = Price;
  }

  public validatePrice(priceProps: number) {
    if (priceProps < 0) {
      return false
    }

    return true;
  }

  static create(PriceProps: number): Either<InvalidPrice, Price> {
    const price = new Price(PriceProps);
    
    if (!price.validatePrice(PriceProps)) {
      return left(new InvalidPrice())
    }

    return right(price);
  }

}