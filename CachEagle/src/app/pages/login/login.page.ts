import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertController, MenuController, NavController} from "@ionic/angular";

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
    private alert: AlertController,
    private menuController: MenuController
  ) {
    this.loginFormModule = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.menuController.enable(false)
  }

  ngOnInit() {
  }

  async onSubmit() {
    let username = this.loginFormModule.value.username
    let password = this.loginFormModule.value.password
    if (await this.authService.login(username, password))
      await this.navController.navigateRoot("sections/search")
    else await this.onWrongCredentials()
  }

  async onWrongCredentials() {
    const popup = await this.alert.create({
      header: "ERRORE",
      message: "Username e/o password errati",
      buttons: ["OK"]
    })
    await popup.present()
  }

  async onRegister() {
    await this.navController.navigateRoot("registration")
  }
}
