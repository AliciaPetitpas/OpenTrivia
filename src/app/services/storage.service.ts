import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey: string = 'OPEN_TRIVIA_KEY';
  private pointsKey: string = 'POINTS_KEY';

  constructor() { }

  async setData(data: any) {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(data),
    })
  }

  async getData() {
    const { value } = await Preferences.get({ key: this.storageKey });

    if (value) {
      return JSON.parse(value);
    }
  }

  async setPoints(points: number) {
    await Preferences.set({
      key: this.pointsKey,
      value: JSON.stringify(points),
    })
  }

  async getPoints() {
    const { value } = await Preferences.get({ key: this.pointsKey });

    if (value) {
      return JSON.parse(value);
    }
  }
  
  async cleanData() {
    await Preferences.remove({ key: this.storageKey })
  }

  async cleanPoints() {
    await Preferences.remove({ key: this.pointsKey })
  }
}
