import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  protected registrationFormModule: FormGroup;

  constructor(
    fb: FormBuilder,
    private navController: NavController
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

  onCreate() {
    this.navController.navigateRoot("login")
  }

  onCancel() {
    this.navController.navigateRoot("login")
  }
}
