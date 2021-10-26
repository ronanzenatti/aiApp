import { FacePage } from './../face/face.page';
import { TagPage } from './../tag/tag.page';
import { AnalisePage } from './../analise/analise.page';
import { ComputerVisionService } from './../services/computer-vision.service';
import { IPhoto } from './../models/Photo';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public computerVisionService: ComputerVisionService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async detalhesImagem(photo: IPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const analise = await this.computerVisionService.detalhesImagem(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: AnalisePage,
      swipeToClose: true,
      componentProps: analise,
    });
    await loading.dismiss();
    return await modal.present();
  }

  async itensImagem(photo: IPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const tagsImage = await this.computerVisionService.tagsImagem(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: TagPage,
      swipeToClose: true,
      componentProps: { tagsImage },
    });
    await loading.dismiss();
    return await modal.present();
  }

  async analiseFace(photo: IPhoto) {
    const loading = await this.loadingController.create({
      message: 'Analisando...',
    });
    await loading.present();

    const dadosRosto = await this.computerVisionService.analiseFace(await this.photoService.getBlob(photo));

    const modal = await this.modalController.create({
      component: FacePage,
      swipeToClose: true,
      componentProps: { dadosRosto },
    });
    await loading.dismiss();
    return await modal.present();
  }

  public async showActionSheet(photo: IPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações para imagem...',
      mode: 'ios',
      buttons: [
        {
          text: 'Análise de Imagem',
          icon: 'eye-outline',
          handler: () => {
            this.detalhesImagem(photo);
          }
        },
        {
          text: 'Itens na Imagem',
          icon: 'pricetags-outline',
          handler: () => {
            this.itensImagem(photo);
          }
        },
        {
          text: 'Análise de Rosto',
          icon: 'person-circle-outline',
          handler: () => {
            this.analiseFace(photo);
          }
        },
        {
          text: 'Deletar',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });
    await actionSheet.present();
  }


}
