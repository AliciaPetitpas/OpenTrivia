import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';
import { APIService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';

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
  difficulty: string = "Easy";
  amount: number = 2;
  keepInfos: boolean = false;
  errorMsg: string = "";
  isError: boolean = true;
  isAlertOpen: boolean = false;
  alertButtons: any[] = ['OK'];
  isToastOpen: boolean = false;
  toastMsg: string = "";

  imgCat: string = "";

  constructor(private openTriviaSrv: OpenTriviaService, private apiSrv: APIService, private router: Router) {
    this.openTriviaSrv.getQuestions(this.amount, this.difficulty);
  }

  generateCat() {
    this.apiSrv.getCat().subscribe({
      next: (result: any) => {
        this.imgCat = this.apiSrv.urlCataas + '?' + result._id;
        // console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  verifyInfos() {
    if (this.pseudo.length < 3) {
      this.errorMsg = "Veuillez rentrer un pseudo de 3 caractères minimum";
      this.isAlertOpen = true;
    } else {
      this.errorMsg = "";
      this.isError = false;
      this.router.navigate(['/game', this.pseudo, this.amount, this.difficulty]);
    }
}

  alertOpen(open: boolean) {
    this.isAlertOpen = open;
  }

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
