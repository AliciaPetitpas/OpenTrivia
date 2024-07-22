import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { QuestionsComponent } from '../questions/questions.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, QuestionsComponent]
})
export class IndexPage {
  pseudo: string = "";
  listLevels: any [] =  ['Easy', 'Medium', 'Hard'];
  keepInfos: boolean = false;
  errorMsg: string = "";
  isError: boolean = true;
  isAlertOpen: boolean = false;
  alertButtons: any[] = ['OK'];

  constructor() { }

  verifyInfos() {
    if (this.pseudo.length < 3) {
      this.errorMsg = "Veuillez rentrer un pseudo de 3 caractères minimum";
      this.isAlertOpen = true;
    } else {
      this.errorMsg = "";
      this.isError = false;
      localStorage.setItem("pseudo", this.pseudo);
    }
  }

  alertOpen(open: boolean) {
    this.isAlertOpen = open;
  }
}
