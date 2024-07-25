import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
})
export class HomePage {
  pseudo: string = "";
  listLevels: any [] =  ['Easy', 'Medium', 'Hard'];
  difficulty: string = "";
  amount: number = 1;
  keepInfos: boolean = false;
  errorMsg: string = "";
  isError: boolean = true;
  isAlertOpen: boolean = false;
  alertButtons: any[] = ['OK'];
  isToastOpen: boolean = false;
  toastMsg: string = "";
  points: number = 0;

  imgCat: string = "";

  constructor(private router: Router, private storageSrv: StorageService) {
  }

  async verifyInfos() {
    if (this.pseudo.length < 3) {
      this.errorMsg = "Veuillez rentrer un pseudo de 3 caractères minimum";
      this.isAlertOpen = true;
    } else {
      this.errorMsg = "";
      this.isError = false;

      if (this.keepInfos) {
        this.storageSrv.setData({
          pseudo: this.pseudo,
          difficulty: this.difficulty,
          amount: this.amount
        });
        this.storageSrv.setPoints(this.points);
      } else {
        let storage = this.storageSrv.getData();

        if (await storage) {
          this.storageSrv.cleanData();
        }
      }

      this.router.navigate(['/game', this.pseudo, this.amount, this.difficulty]);
    }
  }

  alertOpen(open: boolean) {
    this.isAlertOpen = open;
  }

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }

  async ngOnInit() {
    let storage = await this.storageSrv.getData();
    this.points = 0;

    if (storage?.pseudo) {
      this.pseudo = storage.pseudo;
      this.difficulty = storage.difficulty
      this.amount = parseInt(storage.amount);
      this.keepInfos = true;
    }
  }
}
