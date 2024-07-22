import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TitleComponent } from '../title/title.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TitleComponent],
})
export class HomePage {

  myText: string = "a";

  srcImg: string = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
  altImg: string = "cat";

  listFruits: any[] = ['papaye', 'mangue', 'pastèque'];

  constructor() {}

  clickMe() {
    alert("bouh");
  }
}
