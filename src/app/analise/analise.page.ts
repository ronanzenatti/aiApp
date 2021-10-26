import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.page.html',
  styleUrls: ['./analise.page.scss'],
})
export class AnalisePage implements OnInit {

  // Data passed in by componentProps
  @Input() captions: string;
  @Input() confidence: string;
  @Input() tags: string[];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    const percent = Number(this.confidence) * 100;
    this.confidence = percent.toFixed(2) + '%';
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
