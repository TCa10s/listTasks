import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, IonList } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishesService } from '../../services/wishes.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input()
  finished: boolean;

  // Usamos el ViewChild para buscar el elemento ion-list en el HTML
  @ViewChild( 'list' ) 
  list: IonList;

  constructor(
    public wishesServices: WishesService,
    private router: Router,
    public toastController: ToastController,
    private alertCrtl: AlertController
  ) {
    this.finished = true;
  }

  ngOnInit() {}
  listSelected(list: List) {
    this.finished
      ? this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`)
      : this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
  }

  deleteList(list: List) {
    this.wishesServices.deleteList(list);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Lista eliminada',
      position: 'bottom',
      color: 'dark',
      duration: 2000,
    });
    toast.present();
  }

  async editList(list: List) {
    const alert = await this.alertCrtl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nuevo nombre',
          value: list.title,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            if (data.titulo.length > 0) {
              list.title = data.titulo;
              this.wishesServices.saveStorage();
              this.list.closeSlidingItems();
              console.log(this.list);
              
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
