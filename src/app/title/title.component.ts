import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true,
})
export class TitleComponent  implements OnInit {

  title: string = "Introduction à Ionic/Angular";

  constructor() { }

  ngOnInit() {}

}
