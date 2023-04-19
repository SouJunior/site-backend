export const SendMailToNewSponsorUseCase = jest.fn().mockReturnValue({
  send: jest.fn().mockReturnValue(Promise.resolve(null))
})