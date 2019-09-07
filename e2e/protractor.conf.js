// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 50000,
  getPageTimeout: 50000,
  // specs: [
  //   './src/**/*.e2e-spec.ts'
  // ],
  specs: ['./src/features/**/*.feature'],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './src/steps/**/*.steps.ts'
    ]
    //  tags: "@debug"
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    return new Promise((resolve, reject) => {

      var MailListener = require("mail-listener2");

      var mailListener = new MailListener({
        username: "ptotc8723@gmail.com",
        password: "87123hjbasd7",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        mailbox: "INBOX"
      });

      mailListener.start();

      mailListener.on("server:connected", function () {
        console.log("Mail listener initialized");
        resolve();
      });

      mailListener.on("server:disconnected", function () {
        console.log("imapDisconnected");
      });

      mailListener.on("error", function (err) {
        console.log(err);
        reject(err);
      });

      global.mailListener = mailListener;
    });
  },
  onCleanUp: function () {
    mailListener.stop();
  }
};