export interface SendMailDto {
  to: string;
  subject: string;
  template: string;
  context: {
    [name: string]: string
  }
}