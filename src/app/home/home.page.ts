import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

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

  constructor(private router: Router) {
  }

  async verifyInfos() {
    if (this.pseudo.length < 3) {
      this.errorMsg = "Veuillez rentrer un pseudo de 3 caractères minimum";
      this.isAlertOpen = true;
    } else {
      this.errorMsg = "";
      this.isError = false;

      if (this.keepInfos) {
        await Preferences.set(
          {
            key: 'pseudo',
            value: this.pseudo,
          }
        );
        await Preferences.set(
          {
            key: 'difficulty',
            value: this.difficulty,
          }
        );
        await Preferences.set(
          {
            key: 'points',
            value: this.points.toString(),
          }
        );
        await Preferences.set(
          {
            key: 'amount',
            value: this.amount.toString(),
          }
        );
      } else {
        let pseudoStorage = (await Preferences.get({ key: 'pseudo' })).value;
        if (pseudoStorage != "") {
          Preferences.remove({key:'pseudo'});
          Preferences.remove({key:'difficulty'});
          Preferences.remove({key:'points'});
          Preferences.remove({key:'amount'});
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
    let pseudoStorage = (await Preferences.get({ key: 'pseudo' })).value;
    let difficultyStorage = (await Preferences.get({ key: 'difficulty' })).value;
    let amountStorage = (await Preferences.get({ key: 'amount' })).value;
    await Preferences.set({ key:'points', value:'0' });

    if (pseudoStorage != "") {
      this.pseudo = pseudoStorage!;
      this.difficulty = difficultyStorage!;
      this.amount = parseInt(amountStorage!);
      this.points = 0;
      this.keepInfos = true;
    }
  }
}
