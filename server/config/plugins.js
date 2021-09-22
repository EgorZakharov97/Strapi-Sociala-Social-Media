module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp-relay.sendinblue.com'),
      port: env('SMTP_PORT', 587),
      auth: {
        user: env('SMTP_USERNAME', 'egor.zakharov97@gmail.com'),
        pass: env('SMTP_PASSWORD', 'gADqLJPRhS6yQC73'),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: 'egor.zakharov97@gmail.com',
      defaultReplyTo: 'egor.zakharov97@gmail.com',
    },
  },
})