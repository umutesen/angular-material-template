import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.css']
})
export class LoginCreateComponent implements OnInit {
login() {
throw new Error('Method not implemented.');
}


  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Admin-panel - Login create');

  }

  cancel() {
    this.router.navigate(['/']);
  }
}
