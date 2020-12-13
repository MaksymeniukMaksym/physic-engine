import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/data/metrics.json'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public data = {
    "webLayout": {
      "size": { "width": 1920, "height": 969 },
      "center": { "x": 950, "y": 430 },
      "first": [
        {
          "r": 125,
          "xPos": 700,
          "yPos": 530,
        },
        {
          "r": 140,
          "xPos": 1360,
          "yPos": 505,
        
        },
        {
          "r": 110,
          "xPos": 1270,
          "yPos": 310,
         
        },
        {
          "r": 120,
          "xPos": 1050,
          "yPos": 190,
         
        },
        {
          "r": 160,
          "xPos": 730,
          "yPos": 210,
         
        },
        {
          "r": 170,
          "xPos": 990,
          "yPos": 440,
          "icon": "/assets/icons/metrics/couch.svg",
        
        }
      ],
      "second": [
        { "r": 75, "xPos": 1300, "yPos": 175 },
        { "r": 50, "xPos": 1000, "yPos": 100 },
        { "r": 50, "xPos": 640, "yPos": 330 },
        { "r": 50, "xPos": 1100, "yPos": 850 },
        { "r": 50, "xPos": 1650, "yPos": 500 },
        { "r": 110, "xPos": 1290, "yPos": 690 },
        { "r": 110, "xPos": 1515, "yPos": 290 },
        { "r": 75, "xPos": 925, "yPos": 725 },
        { "r": 75, "xPos": 675, "yPos": 425 }
      ]
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

}
