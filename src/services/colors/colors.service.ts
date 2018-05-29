import { Injectable } from '@angular/core';

const colors = {
    black: {
        name: 'Negro'
    },
    white: {
        name: 'Blanco'
    },
    red: {
        name: 'Rojo'
    },
    yellow: {
        name: 'Amarillo'
    },
    blue: {
        name: 'Azul'
    },
    green: {
        name: 'Verde'
    }
}

@Injectable()
export class ColorsService {
    private colors_ : any = [];

    constructor() {
      this.buildColorsArray();
    }

    private buildColorsArray() {
      for (const key of Object.keys(colors)) {
        this.colors_.push(colors[key]);
      }
    }

    getColors() : any[] {
     return this.colors_;      
    }

    getColor(key: string) {
        return colors[key] || {};
    }

}

/* "COLORS": [
    {
      "COLOR": "Negro",
      "CODE": {
        "RGBA": [
          255,
          255,
          255,
          1
        ],
        "HEX": "#000"
      }
    },
    {
      "COLOR": "Blanco",
      "CODE": {
        "RGBA": [
          0,
          0,
          0,
          1
        ],
        "HEX": "#FFF"
      }
    },
    {
      "COLOR": "Rojo",
      "CODE": {
        "RGBA": [
          255,
          0,
          0,
          1
        ],
        "HEX": "#FF0"
      }
    },
    {
      "COLOR": "Azul",
      "CODE": {
        "RGBA": [
          0,
          0,
          255,
          1
        ],
        "HEX": "#00F"
      }
    },
    {
      "COLOR": "Amarillo",
      "CODE": {
        "RGBA": [
          255,
          255,
          0,
          1
        ],
        "HEX": "#FF0"
      }
    },
    {
      "COLOR": "Verde",
      "CODE": {
        "RGBA": [
          0,
          255,
          0,
          1
        ],
        "HEX": "#0F0"
      }
    }
  ]
} */