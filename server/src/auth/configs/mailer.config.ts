import { ConfigService } from "@nestjs/config"

export const configMailer = async (ConfigService : ConfigService) => {
  return {
    transport : {
      host : ConfigService.get('MAIL_HOST'),
      port: ConfigService.get('MAIL_PORT'),
      secure: true,
      auth : {
        user: ConfigService.get('MAIL_USER'),
        pass: ConfigService.get('MAIL_PASSWORD')
      }
    }
  }
}