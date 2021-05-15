import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WishesService } from 'src/app/services/wishes.service';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  lists: any[] = [];
  listId: number;
  constructor(
    public wishesServices: WishesService,
    private router: Router,
    private alertCrtl: AlertController
  ) {}

  async addList() {
    const alert = await this.alertCrtl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length > 0) {
              const listId = this.wishesServices.createList(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);
            }
          },
        },
      ],
    });
    alert.present();
  }
}
