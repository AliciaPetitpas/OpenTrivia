import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class PointsPage {
  pseudo: string = "";
  percent: number = 0;
  amount: number = 1;
  points: number = 0;
  message: string = "";

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe({
      next: (response: any) => {
        this.pseudo = response.get("pseudo");
        this.points = response.get("points");
        this.amount = response.get("amount");
        this.percent = (response.get("points") / response.get("amount")) * 100;

        if (this.points == 0) {
          this.message = "Désolé " + this.pseudo + ", retente ta chance !";
        } else {
          this. message = "Bravo " + this.pseudo + ", vous avez eu " + this.percent + "% de bonnes réponses !";
          // this. message = "Bravo " + this.pseudo + ", vous avez gagné " + this.points + "/" + this.amount + " points !";
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  async replay() {
    await Preferences.set({ key:'points', value:'0' });
    this.router.navigate(['/home'])
  }
}
