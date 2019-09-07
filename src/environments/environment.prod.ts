import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  label: '#{CLIENTLABEL}#',
  apiUrl: '#{APIURL}#',
  buildNumber: '#{BUILDNUMBER}#',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
