import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class PointsPage implements OnInit {
  pseudo: string = "";
  amount: number = 1;
  difficulty: string = "Easy";
  points: number = 0;
  message: string = "";

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe({
      next: (response: any) => {
        this.pseudo = response.get("pseudo");
        this.points = response.get("points");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit() {
    if (this.points == 0) {
      this.message = "Désolé " + this.pseudo + ", retente ta chance !";
    } else {
      this. message = "Bravo " + this.pseudo + ", vous avez gagné " + this.points + " points !";
    }
  }

  

  replay() {
    this.router.navigate(['/home'])
  }
}
