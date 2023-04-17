import { Test } from "@nestjs/testing"
import { MailData, MailProvider } from "../../../shared/providers/mailer/mailer-provider"
import { Mail } from "../../../shared/providers/mailer/protocols/mail"
import { SendMailToNewSponsorUseCase } from "../use-cases/send-mail-to-new-donator"

const makeMailProvider = (): Mail => {
  class MailProviderStub implements Mail {
    send(data: MailData): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new MailProviderStub()
}

describe("Send mail to new sponsor use case", () => {
  let sut: SendMailToNewSponsorUseCase
  let mailProviderStub: Mail

  beforeEach(async () => {
    mailProviderStub = makeMailProvider()
    const moduleRef = await Test.createTestingModule({
      providers: [SendMailToNewSponsorUseCase, {
        provide: MailProvider,
        useValue: mailProviderStub
      }]
    }).compile()

    sut = moduleRef.get<SendMailToNewSponsorUseCase>(SendMailToNewSponsorUseCase)
  })

  test("SendMailToNewSponsorUseCase should be defined", () => {
    expect(sut).toBeDefined()
  })

  test('should call MailProvider with correct values', async () => {
    const mailData = {
      description: 'any-description',
      email: 'any-email',
      name: 'any-name',
      nickname: 'any-nickname',
      phone: 'any-phone'
    }

    const sendSpy = jest.spyOn(mailProviderStub, 'send')
    await sut.send(mailData)
    expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({
      context: mailData
    }))

  })
})