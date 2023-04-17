import { Test } from "@nestjs/testing"
import { SponsorController } from "../sponsor.controller"
import { SendMailToNewSponsorUseCase } from "../use-cases/send-mail-to-new-donator"
import { SendMailDto } from "src/shared/providers/mailer/dto/send-mail-dto"

jest.mock("../use-cases/send-mail-to-new-donator")

const makeSendMailDto = (): SendMailDto => ({
  description: 'any-description',
  email: 'any-email',
  name: 'any-name',
  nickname: 'any-nickname',
  phone: 'any-phone'
})

describe("Sponsor Controller", () => {
  let sponsorController: SponsorController
  let sendMailToNewSponsorUseCase: SendMailToNewSponsorUseCase

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [SponsorController],
      providers: [SendMailToNewSponsorUseCase]
    }).compile()

    sponsorController = moduleRef.get<SponsorController>(SponsorController)
    sendMailToNewSponsorUseCase = moduleRef.get<SendMailToNewSponsorUseCase>(SendMailToNewSponsorUseCase)
    jest.clearAllMocks()
  })

  it("Should call sendMailToNewSponsorUseCase with correct values", async () => {
    await sponsorController.send(makeSendMailDto())

    expect(sendMailToNewSponsorUseCase.send).toHaveBeenCalledWith(makeSendMailDto())
  })
})