import { Either, left, right } from '../../../core/logic/Either';
import { InvalidValue } from './Errors/InvalidValue';

export class Value {
  public value: number;

  private constructor(Value: number) {
    this.value = Value;
  }

  public validateValue(valueProps: number) {
    if (valueProps < 0) {
      return false
    }

    return true;
  }

  static create(ValueProps: number): Either<InvalidValue, Value> {
    const value = new Value(ValueProps);
    
    if (!value.validateValue(ValueProps)) {
      return left(new InvalidValue())
    }

    return right(value);
  }

}