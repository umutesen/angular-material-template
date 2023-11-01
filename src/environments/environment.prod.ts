import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  useEmulators: false,
  firebase: {
      apiKey: "AIzaSyB9LOREMGhj1jpVXOHTKIwQu2oM7pVfjQg",
      authDomain: "fir-course-recording-c7f3e.firebaseapp.com",
      projectId: "fir-course-recording-c7f3e",
      storageBucket: "fir-course-recording-c7f3e.appspot.com",
      messagingSenderId: "927953565493",
      appId: "1:927953565493:web:0d4a8e79cc45fd38733e7c"
  },
  api: {
      createUser: " https://us-central1-fir-course-recording-c7f3e.cloudfunctions.net/createUser"
  }
};
