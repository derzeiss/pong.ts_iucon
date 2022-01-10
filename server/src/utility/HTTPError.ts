export class HTTPError extends Error {
  public status: number;

  constructor(msg: string, status: number = 500) {
    super(msg);
    this.status = status;
  }
}
