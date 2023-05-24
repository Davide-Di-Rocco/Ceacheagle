import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, NavController} from "@ionic/angular";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  protected registrationFormModule: FormGroup;

  constructor(
    fb: FormBuilder,
    private navController: NavController,
    private alert: AlertController,
    private registrationService: RegistrationService
  ) {
    this.registrationFormModule = fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        passwordControl: ['', Validators.required],
      }
    )
  }

  ngOnInit() {
  }

  async onCreate() {
    let email = this.registrationFormModule.value.email
    let username = this.registrationFormModule.value.username
    let password = this.registrationFormModule.value.password
    let passwordControl = this.registrationFormModule.value.passwordControl

    console.log("email = '" + email + "'")
    console.log("username = '" + username + "'")
    console.log("password = '" + password + "'")
    console.log("password control = '" + passwordControl + "'")
    if (password === passwordControl) {
      if (await this.registrationService.register(username, email, password)) {
        await this.navController.navigateRoot("login")
        await this.popup("UTENTE CREATO", "Registrazione effettuata con successo")
      } else {
        await this.popup("ERRORE", "Connessione con il server fallita. Controlla la connessione e riprova")
      }
    } else {
      await this.popup("ERRORE", "Le password inserite devono coincidere")
    }
    // await this.navController.navigateRoot("login")
  }

  async popup(title: string, message: string) {
    const popup = await this.alert.create({
      header: title,
      message: message,
      buttons: ["OK"]
    })
    await popup.present()
  }


  onCancel() {
    this.navController.navigateRoot("login")
  }
}
