import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-face',
  templateUrl: './face.page.html',
  styleUrls: ['./face.page.scss'],
})
export class FacePage implements OnInit {

  @Input() dadosRosto: any[];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.dadosRosto);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
