import { cardiErrors } from "./cardiErrors";
import { CardiErrorTypes } from "./CardiErrorTypes";

export class CardiError extends Error {
  public readonly name: CardiErrorTypes;
  public readonly message: string;
  public readonly status: number;
  public readonly type: string;

  constructor(name: CardiErrorTypes) {
    super();

    this.type = 'CardiError'
    this.name = name;
    this.message = cardiErrors[name].message;
    this.status = cardiErrors[name].status;
  }
}
