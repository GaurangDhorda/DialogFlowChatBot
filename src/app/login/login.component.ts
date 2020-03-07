import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatbotdialogflowService } from '@chatService';
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
  objectKeys = Object.keys;
  check: boolean;
  westeros = {
    "name":"gaurang",
    "arya":"stark",
    "ramsay":"bolton",
    "c":[ 
       { 
          "d":"iner",
          "e":{ 
             "f":"more inner",
             "g":"obj",
             "e":"e"
          },
          "f":[ 
             { 
                "name":"Vijay","z":{"q":"val","c":"val"}
             },
             { 
                "surname":"soni"
             }
          ]
       },
       { 
          "d":"inner",
          "e":{ 
             "f":"more inner"
          }
       }
    ],
    "z":{ 
       "name":"z-value",
       "t":[ 
 
       ]
    }
 };
 selection = 4;
  generateArray(obj) {
    return Object.keys(obj).map((key) => { return { key: key, value: obj[key]} });
  }
 isArray(objAE){
    if ( Array.isArray (objAE) ){
      
      return true;
    }
    else{
      return false;
    }
 }
 isObject(values){
   if (typeof values === 'object'){
     return true;
   }
   else{
     return false;
   }
 }
 stopClose(event){
   console.log(event);
 }
  constructor(private formBuilder: FormBuilder, private authService: ChatbotdialogflowService, private router: Router) { }
  onSelect(event,id)
  {
    console.log( `${id} : ${event.key} and ${event.value} ` );
    this.check = true;
    // this.westeros = event.value;
  }
  checkType(data){
    if (Array.isArray (data)){
      return true;
    }
    else {
      return false;
    }

  }
  alert(item){
    console.log(item.target.value)
  }
  ngOnInit() {
    this.check= false;
    
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
