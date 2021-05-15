import { Component, OnInit } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  list: List;
  nameItem: string;

  constructor(
    private wishesServices: WishesService,
    private route: ActivatedRoute
  ) {
    this.nameItem = '';

    let listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.wishesServices.getList(listId);
  }

  ngOnInit() {}

  addItem() {
    if (this.nameItem.length > 0) {
      const newItem = new ListItem(this.nameItem);
      this.list.items.push(newItem);
      this.nameItem = '';
      this.wishesServices.saveStorage();
    }
  }

  changeCheck(item: ListItem) {
    const slopes = this.list.items.filter((items) => !items.completed).length;
    if( slopes == 0 ) {
      this.list.completedIn = new Date();
      this.list.completed = true;   
    } else {
      this.list.completedIn = null;
      this.list.completed = false;
    }
    this.wishesServices.saveStorage();
  }

  delete(i: number) {
    this.list.items.splice(i, 1);
    this.wishesServices.saveStorage();
  }
}
