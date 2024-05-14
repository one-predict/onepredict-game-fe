export default class RequestError extends Error {
  public name = 'RequestError';

  constructor(
    message: string,
    readonly responseStatus: number,
  ) {
    super(message);
  }
}
