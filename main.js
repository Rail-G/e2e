/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/validate.js
class CardValidate {
  constructor() {
    this.cards = document.querySelector('.bank-cards');
    this.inputBar = document.querySelector('.field');
    this.button = document.querySelector('.input-button');
    this.currentCard;
    this.cardNum;
    this.clickedCardNum;
    this.valid;
  }
  changeCard() {
    this.inputBar.addEventListener('input', () => {
      if (this.valid) {
        this.inputBar.classList.remove(this.valid);
        if (document.querySelector('.error-text')) {
          document.querySelector('.error-text').remove();
        }
        this.valid = '';
      }
      const cardName = this.findCardType(Number(this.inputBar.value));
      if (cardName) {
        this.cardNum = this.inputBar.value;
      }
      console.log(cardName, this.cardNum);
      if (this.cardNum > this.inputBar.value) {
        this.currentCard.classList.remove('active');
        this.cards.querySelectorAll('li').forEach(elem => {
          if (elem.className != cardName) {
            elem.classList.remove('not-active');
          }
        });
        this.currentCard = '';
        this.cardNum = '';
      }
      if (cardName != undefined && !this.currentCard) {
        this.cards.querySelectorAll('li').forEach(elem => {
          if (elem.className != cardName) {
            elem.classList.add('not-active');
          }
        });
        this.currentCard = this.cards.querySelector(`.${cardName}`);
        this.currentCard.classList.add('active');
      } else if (cardName == undefined && !this.currentCard) {
        if (this.cards.querySelector('.active')) {
          this.cards.querySelector('.active').classList.remove('active');
        }
      }
    });
    this.checkValidate();
  }
  findCardType(num) {
    if ([34, 37].includes(num)) {
      return 'amex';
    } else if ([6011, 644, 645, 646, 647, 648, 649, 65].includes(num)) {
      return 'discover';
    } else if (3528 <= num && num <= 3589) {
      return 'jcb';
    } else if (2221 <= num && num <= 2720 || 51 <= num && num <= 55) {
      return 'mastercard';
    } else if (2200 <= num && num <= 2204) {
      return 'mir';
    } else if (4 == num) {
      return 'visa';
    }
  }
  checkValidate() {
    this.button.addEventListener('click', e => {
      e.preventDefault();
      if (!this.inputBar.value) {
        this.inputBar.classList.add('not-accept');
        this.valid = 'not-accept';
        return;
      }
      const boolean = this.luhnCheck(this.inputBar.value);
      if (boolean) {
        this.inputBar.classList.remove('not-accept');
        this.inputBar.classList.add('accept');
        this.valid = 'accept';
      } else {
        this.inputBar.classList.remove('accept');
        this.inputBar.classList.add('not-accept');
        this.valid = 'not-accept';
        this.drawNotAcceptedText();
      }
    });
  }
  drawNotAcceptedText() {
    const p = document.createElement('p');
    p.textContent = 'This card number is not correct. Please try again.';
    p.classList.add('error-text');
    document.querySelector('.input-block').append(p);
  }
  luhnCheck(input) {
    const number = input.toString();
    const digits = number.replace(/\D/g, "").split("").map(Number);
    let sum = 0;
    let isSecond = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const obj = new CardValidate();
obj.changeCard();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;