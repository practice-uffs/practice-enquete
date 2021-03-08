export class BaseError extends Error {
  constructor(public code: number, public message: string, public details: [string] | string | undefined = undefined) {
    super(message);
  }
}
