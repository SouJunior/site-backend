import { Test } from "@nestjs/testing"
import { MailData, MailProvider } from "../mailer-provider"
import { MailerService } from "@nestjs-modules/mailer"

class MailServiceMock {
  async sendMail(data: MailData) {
    return Promise.resolve(null)
  }
}

describe("Mailer provider", () => {
  let sut: MailProvider
  let mailServiceMock: MailServiceMock

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MailProvider, {
        provide: MailerService,
        useClass: MailServiceMock
      }]
    }).compile()

    sut = moduleRef.get<MailProvider>(MailProvider)
    mailServiceMock = moduleRef.get<MailerService>(MailerService)
  })

  test("MailProvider should be defined", () => {
    expect(sut).toBeDefined()
  })

  test("MailerService should be called with correct values", async () => {
    const sendMailSpy = jest.spyOn(mailServiceMock, 'sendMail')
    const mailData = {
      context: {
        anyKey: 'any-value'
      },
      subject: 'any-subject',
      template: 'any-template',
      to: 'any-to'
    }
    await sut.send(mailData)
    expect(sendMailSpy).toBeCalled()
  })
})