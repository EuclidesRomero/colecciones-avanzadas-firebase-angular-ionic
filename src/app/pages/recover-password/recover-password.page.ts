import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  recoverForm: FormGroup;
  formSubmitted = false;

  constructor(
    private FB: FormBuilder,
    private AS: AuthService,
    private router: Router,
    private AC: AlertController,
  ) { this.recoverForm = this.FB.group({
    email: ['', [Validators.required, Validators.email]],
  })}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

resetPassword(event: Event): void {
  this.formSubmitted = true;
  event.preventDefault();
  if(this.recoverForm?.valid){
    const value = this.recoverForm.value;
    this.AS.recoverPassword(value.email).then(
      async () => {
        const alert = await this.AC.create({
          message: 'te enviamos un corro con las instrucciones para que cambies la contraseña',
          buttons: [
            {
              text: 'Done',
              role: 'cancel',
              handler: () => {
                this.router.navigateByUrl('login');
              }
            }
          ]
        });
        await alert.present();
      },
      async (error) => {
        const errorAlert = await this.AC.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}],
        })
        await errorAlert.present();
      }
      );
    }
}


invalidField(field: string): boolean {
  if(this.recoverForm.get(field)!.invalid && this.formSubmitted) {
    return true;
  } else {
    return false ;
  }
}


getErrorMessage(field: string): string {
  let message = '';
  if(this.recoverForm.get(field)!.hasError('required')) {
    message = 'Este campos es requerido;'
  } else if (this.recoverForm.get(field)!.hasError('email')){
    message = 'Este campo no cumple con el formato de correo';
  }
  return message;
}

getEmailField(){
  return this.recoverForm?.get('email');
}

}
