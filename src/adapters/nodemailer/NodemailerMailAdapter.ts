import { MailAdapter, SendMailData } from '@/adapters/MailAdapter';

import { transport } from '@/config/mailtrap';

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: `Bruno Cardoso <${process.env.MAILTRAP_TO_EMAIL}>`,
      subject,
      html: body,
    });
  }
}
