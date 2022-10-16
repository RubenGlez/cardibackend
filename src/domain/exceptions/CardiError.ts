import { cardiErrors } from "./cardiErrors";
import { CardiErrorTypes } from "./CardiErrorTypes";

export class CardiError extends Error {
  public readonly type = 'CardiError'
  public readonly name: CardiErrorTypes;
  public readonly message: string;
  public readonly status: number;
  public readonly info: Record<string, string>;

  constructor(name: CardiErrorTypes, info?: Record<string, string>) {
    super();

    this.name = name;
    this.message = cardiErrors[name].message;
    this.status = cardiErrors[name].status;
    this.info = info || {}
  }
}
