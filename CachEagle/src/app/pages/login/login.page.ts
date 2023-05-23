import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected loginFormModule: FormGroup

  constructor(
    fb: FormBuilder,
    private authService: AuthenticationService,
    private navController: NavController,
    private alert: AlertController
  ) {
    this.loginFormModule = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    let username = this.loginFormModule.value.username
    let password = this.loginFormModule.value.password
    if (await this.authService.login(username, password))
      await this.navController.navigateRoot("sear")
    else await this.onWrongCredentials()
  }

  async onWrongCredentials() {
    const popup = await this.alert.create({
      header: "Login Error",
      message: "Wrong username or password",
      buttons: ["OK"]
    })
    await popup.present()
  }

  async onRegister() {
    await this.navController.navigateRoot("registration")
  }
}
