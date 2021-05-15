import { ListItem } from './list-item.model';

export class List {
    id: number;
    title: string;
    createIn: Date;
    completedIn: Date;
    completed: boolean;
    items: ListItem[];

    constructor( title: string, ) {
        this.title = title;
        this.createIn = new Date();
        this.completed = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}