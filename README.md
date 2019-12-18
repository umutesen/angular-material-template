[![Build status](https://dev.azure.com/umutesen/onthecode/_apis/build/status/Material%20Template%20CI)](https://dev.azure.com/umutesen/onthecode/_build/latest?definitionId=11)

# [Angular Material Starter Template](https://onthecode.co.uk/angular-material-starter-template-for-your-next-project/)

![Product Gif](https://github.com/umutesen/angular-material-template/blob/media/material-template-demo.gif)


**[Angular Material Application Template](https://onthecode.co.uk/angular-material-starter-template-for-your-next-project/)** is a free template built with Angular 8 and Angular Material 8. You can use it out of the box without having to change any file paths. Everything you need to start development on an Angular 8 project is here.

Angular Material starter template has been built with the official style guide in mind, which means it promotes a clean folder structure and separation of concerns. The material template is fully responsive and contains the fundamental building blocks of a scalable Angular application:

* Login component
* Password reset component
* Responsive Admin dashboard with sidebar
* Account area with change password component
* Log out
* All Angular Material components

In addition to Angular 8, other well-known open-source libraries such as rxjs, moment and ngx-logger are also included.

This application template came as a result of several applications that we have developed over the past few years. We have always used Angular Material components and wanted to create a starter template to save time for greenfield projects. We developed it based on user feedback and it is a powerful Angular admin dashboard, which allows you to build products like admin panels, content management systems (CMS) and customer relationship management (CRM) software.

### Starter Template Features

* Clean folder structure
* Core module
* Shared module
* Example feature modules
* Lazy-loaded feature modules
* Global error-handling
* Error logging with ngx-logger (logging to browser & remote API)
* HTTP Interceptors to inject JWT-tokens Authentication and role guards (for Role-based access)
* Shows spinner for all HTTP requests
* Angular flex layout

## Table of Contents

* [Demo](#demo)
* [Quick Start](#quick-start)
* [Supported Browsers](#supported-browsers)
* [Resources](#resources)
* [Technical Help](#technical-help)
* [Licensing](#licensing)

## Demo
[View Demo](http://demo.onthecode.co.uk/angular-material-template)

## Quick start
Start by downloading the template from one of these locations:

- [Download from Github](https://github.com/umutesen/angular-material-template/archive/master.zip)
- [Download from onthecode](https://onthecode.co.uk/angular-material-starter-template-for-your-next-project/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and currently uses version 8.x and Angular 8.x.

Follow the steps below to start using the template.

1. Install NodeJS from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal ([Download Git Bash](https://gitforwindows.org/) for Windows or use cmd)
3. Go to your file project
4. Make sure you have installed [Angular CLI](https://github.com/angular/angular-cli) already. If not, please install.
5. Run in terminal: ```npm install```
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
7. Use your favourite IDE to **rebrand** the project. Just search and replace all occurances of `angular-material-template` with your project name.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Supported Browsers
At present, we officially aim to support the last two versions of the following browsers:

<img src="https://github.com/umutesen/angular-material-template/blob/media/chrome.png?raw=true" width="64" height="64"><img src="https://github.com/umutesen/angular-material-template/blob/media/firefox.png?raw=true" width="64" height="64"><img src="https://github.com/umutesen/angular-material-template/blob/media/edge.png?raw=true" width="64" height="64"><img src="https://github.com/umutesen/angular-material-template/blob/media/safari.png?raw=true" width="64" height="64"> <img src="https://github.com/umutesen/angular-material-template/blob/media/opera.png?raw=true" width="64" height="64">

### What's included

Within the download you'll find the following directories and files:

```
├── LICENSE
├── README.md
├── angular.json
├── e2e
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── about
│   │   │   ├── about-home
│   │   │   │   ├── about-home.component.css
│   │   │   │   ├── about-home.component.html
│   │   │   │   ├── about-home.component.spec.ts
│   │   │   │   └── about-home.component.ts
│   │   │   ├── about-routing.module.ts
│   │   │   └── about.module.ts
│   │   ├── account
│   │   │   ├── account-routing.module.ts
│   │   │   ├── account.module.ts
│   │   │   ├── change-password
│   │   │   │   ├── change-password.component.css
│   │   │   │   ├── change-password.component.html
│   │   │   │   └── change-password.component.ts
│   │   │   ├── profile
│   │   │   │   ├── profile.component.css
│   │   │   │   ├── profile.component.html
│   │   │   │   └── profile.component.ts
│   │   │   └── profile-details
│   │   │       ├── profile-details.component.css
│   │   │       ├── profile-details.component.html
│   │   │       └── profile-details.component.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── auth
│   │   │   ├── auth-routing.module.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── login
│   │   │   │   ├── login.component.css
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.ts
│   │   │   ├── password-reset
│   │   │   │   ├── password-reset.component.css
│   │   │   │   ├── password-reset.component.html
│   │   │   │   └── password-reset.component.ts
│   │   │   └── password-reset-request
│   │   │       ├── password-reset-request.component.css
│   │   │       ├── password-reset-request.component.html
│   │   │       └── password-reset-request.component.ts
│   │   ├── core
│   │   │   ├── core.module.ts
│   │   │   ├── guards
│   │   │   │   ├── admin.guard.spec.ts
│   │   │   │   ├── admin.guard.ts
│   │   │   │   ├── auth.guard.spec.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── module-import.guard.ts
│   │   │   ├── interceptors
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── spinner.interceptor.ts
│   │   │   └── services
│   │   │       ├── auth.service.ts
│   │   │       ├── globar-error.handler.ts
│   │   │       ├── notification.service.ts
│   │   │       ├── spinner.service.spec.ts
│   │   │       └── spinner.service.ts
│   │   ├── custom-material
│   │   │   ├── custom-material.module.ts
│   │   │   └── select-check-all
│   │   │       ├── select-check-all.component.css
│   │   │       ├── select-check-all.component.html
│   │   │       └── select-check-all.component.ts
│   │   ├── customers
│   │   │   ├── customer-list
│   │   │   │   ├── customer-list.component.css
│   │   │   │   ├── customer-list.component.html
│   │   │   │   └── customer-list.component.ts
│   │   │   ├── customers-routing.module.ts
│   │   │   └── customers.module.ts
│   │   ├── dashboard
│   │   │   ├── dashboard-home
│   │   │   │   ├── dashboard-home.component.css
│   │   │   │   ├── dashboard-home.component.html
│   │   │   │   └── dashboard-home.component.ts
│   │   │   ├── dashboard-routing.module.ts
│   │   │   └── dashboard.module.ts
│   │   ├── icons
│   │   │   ├── icons
│   │   │   │   ├── icons.component.css
│   │   │   │   ├── icons.component.html
│   │   │   │   ├── icons.component.spec.ts
│   │   │   │   └── icons.component.ts
│   │   │   ├── icons-routing.module.ts
│   │   │   └── icons.module.ts
│   │   ├── shared
│   │   │   ├── confirm-dialog
│   │   │   │   ├── confirm-dialog.component.css
│   │   │   │   ├── confirm-dialog.component.html
│   │   │   │   └── confirm-dialog.component.ts
│   │   │   ├── content-placeholder-animation
│   │   │   │   ├── content-placeholder-animation.component.css
│   │   │   │   ├── content-placeholder-animation.component.html
│   │   │   │   └── content-placeholder-animation.component.ts
│   │   │   ├── footer
│   │   │   ├── layout
│   │   │   │   ├── layout.component.css
│   │   │   │   ├── layout.component.html
│   │   │   │   └── layout.component.ts
│   │   │   ├── mocks
│   │   │   │   └── spinner-consumer.ts
│   │   │   ├── pipes
│   │   │   │   ├── limit-to.pipe.spec.ts
│   │   │   │   ├── limit-to.pipe.ts
│   │   │   │   ├── local-date.pipe.spec.ts
│   │   │   │   ├── local-date.pipe.ts
│   │   │   │   ├── yes-no.pipe.spec.ts
│   │   │   │   └── yes-no.pipe.ts
│   │   │   ├── shared.module.ts
│   │   │   └── validators
│   │   │       └── autocompleteSelectionValidator.ts
│   │   ├── typography
│   │   │   ├── typography
│   │   │   │   ├── typography.component.css
│   │   │   │   ├── typography.component.html
│   │   │   │   ├── typography.component.spec.ts
│   │   │   │   └── typography.component.ts
│   │   │   ├── typography-routing.module.ts
│   │   │   └── typography.module.ts
│   │   └── users
│   │       ├── user-list
│   │       │   ├── user-list.component.css
│   │       │   ├── user-list.component.html
│   │       │   └── user-list.component.ts
│   │       ├── users-routing.module.ts
│   │       └── users.module.ts
│   ├── assets
│   │   ├── favicon
│   │   └── user.png
│   ├── browserslist
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── karma.conf.js
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```

## Resources
- Demo: <http://demo.onthecode.co.uk/angular-material-template>
- Download Page: <https://onthecode.co.uk/product/angular-material-template>
- License Agreement: [License Agreement](https://github.com/umutesen/angular-material-template/blob/master/LICENSE)
- Support: [Ask onthecode](https://onthecode.co.uk/ask-question)
- Issues: [Github Issues](https://github.com/umutesen/angular-material-template/issues)

## Technical Help

We use GitHub Issues as the official bug tracker for this template. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the template.
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

If you have questions or need help integrating the product please [contact us](https://onthecode.co.uk/ask-question) instead of opening an issue.

## Licensing

- Copyright 2019 onthecode (https://onthecode.co.uk/)
- Licensed under MIT [License Agreement](https://github.com/umutesen/angular-material-template/blob/master/LICENSE)
