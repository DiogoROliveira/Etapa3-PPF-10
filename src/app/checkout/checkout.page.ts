import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from '../components/payment-modal/payment-modal.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {
  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  async submitAddress() {
    if (this.addressForm.valid) {
      this.openPaymentModal();
    }
  }

  async openPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: { address: this.addressForm.value }
    });
    await modal.present();
  }
}