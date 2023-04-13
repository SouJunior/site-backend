export abstract class Mail {
  abstract send(data: any): Promise<void>
}