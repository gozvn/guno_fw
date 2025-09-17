import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

    lowerCase = true;
    upperCase = true;
    numbers = true;
    symbols = true;
    dictionary: string[] = [];
    chars = [
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
        "0123456789",
        "!@#$%^&*-"
    ];

    length = 15;

    constructor() {}

    public generatePassword(n: any) {
        if (this.lowerCase === false && this.upperCase === false && this.numbers === false && this.symbols === false) {
            return "...";
        }

        this.length = typeof n !== 'undefined' ? n : this.length;
        this.dictionary = ([] as string[]).concat(
            this.lowerCase ? this.chars[0].split("") : [],
            this.upperCase ? this.chars[1].split("") : [],
            this.numbers ? this.chars[2].split("") : [],
            this.symbols ? this.chars[3].split("") : []
        );
        // Generate random password from array
        let newPassword = "";
        for (let i = 0; i < this.length; i++) {
            if (i < this.chars.length) {
                newPassword += this.chars[i].charAt(Math.floor(this.getRandomValue(this.chars[i].length)));
            } else {
                newPassword += this.dictionary[Math.floor(this.getRandomValue(this.dictionary.length))]
            }
        }

        return newPassword;
    }

    getRandomValue(length: number) {
        const randomArray = new Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        const randomValue = randomArray[0] / (0xFFFFFFFF + 1);
        return Math.floor(randomValue * length);
    }
}
