import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(private mailService : MailerService,
              private configService : ConfigService
              ) {}
  async sendActivationMail (to : string, link : string) {
    await this.mailService.sendMail({
      from: this.configService.get('MAIL_USER'),
      to,
      subject: 'Account activate on ' + this.configService.get('API_URL'),
      text: '',
      html: `
        <div>
          <h1>To activate follow the link</h1>
          <a href="${link}">${link}</a>
        </div>
      `

    })
  }
}
