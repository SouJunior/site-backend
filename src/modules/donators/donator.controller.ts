import { Body, Controller, Post } from "@nestjs/common";
import { SendMailToNewDonatorUseCase } from "./use-cases/send-mail-to-new-donator";
import { SendMailDto } from "src/shared/providers/mailer/dto/send-mail-dto";

@Controller('donator')
export class DonatorController {
  constructor(private readonly mailProvider: SendMailToNewDonatorUseCase) { }

  @Post()
  async send(@Body() sendMailDto: SendMailDto) {
  }
}