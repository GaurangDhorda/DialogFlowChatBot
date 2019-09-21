import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatbotdialogflowService } from '../chatbotdialogflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginFailMessage: string;
  loginfail: boolean;
    
  constructor(private formBuilder: FormBuilder, private authService: ChatbotdialogflowService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginfail = false;
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
      this.loginfail = false;
      this.submitted = true;
      if (this.loginForm.invalid) {
        console.log('fire');
        return;
      }
      this.authService.isAuthenticated(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .subscribe (authenticated => {
        if (authenticated) {
          console.log(authenticated);
          let url = this.authService.getRedirectUrl();
          console.log(url);
          this.router.navigate([url]);
          this.submitted = false;
          this.loading = false;
          this.loginfail = false;
        } else{
          this.loginFailMessage = 'Login Fail. Try Again with below given details...';
          this.loginfail = true;
          setTimeout(()=>{
            this.loginfail = false;
          },5000);
          this.loginForm.get('username').setValue('');
          this.loginForm.get('password').setValue('');
          this.loading = false;
          this.submitted = false;
        }
      }, (err => this.loading = false),
          () => this.loading = false);
  }
}
