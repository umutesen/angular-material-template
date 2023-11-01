import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  useEmulators: false,
  firebase: {
    projectId: 'setlisthelperfirebase',
    appId: '1:1090429457023:web:46b62263a22fc5efad254a',
    databaseURL: 'https://setlisthelperfirebase.firebaseio.com',
    storageBucket: 'setlisthelperfirebase.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCdE46hZGPCGViLXQ23TlkU4amwZJkk-8s',
    authDomain: 'setlisthelperfirebase.firebaseapp.com',
    messagingSenderId: '1090429457023',
    measurementId: 'G-WH7XCFGF5V',
  },
  api: {
      createUser: "http://localhost:5001/fir-course-recording-c7f3e/us-central1/createUser"
  },
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF
};
