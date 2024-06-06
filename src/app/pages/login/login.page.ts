import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private AC : AlertController
    ) { 

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }

  ngOnInit() {
    this.formSubmitted = false;
  }

  async loginUser(event: Event): Promise<void> {
    this.formSubmitted = true;
    event.preventDefault();
    if(this.loginForm?.value){
      const value = this.loginForm.value;
      this.authService.loginUser(value.email, value.password).then(
        () => {
          this.router.navigateByUrl('home');
        }, async(error) => {
          const alert = await this.AC.create({
            message: error.message,
            buttons: [{text: 'Ok', role: 'cancel'}]
          });

          await alert.present();

        }
      )
    }

  }

  invalidField (field: string): boolean{
    if(this.loginForm.get(field)!.invalid && this.formSubmitted){
      return true;
    }
    else {
      return false;
    }
  }

  getErrorMessage(field: string): string {
    let message = '';
    if(this.loginForm.get(field)!.hasError('rquiered')){
      message = 'Este campo es requerido';
    } else if (this.loginForm.get(field)!.hasError('email')){
      message = 'El campo no cumple con el formato de correo';
    }
    return message;
  }

  getEmailField() {
    return this.loginForm.get('email');
  }

  getPassfield() {
    return this.loginForm.get('password');
  }
}

