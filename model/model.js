/*
 * Profile -- buy house
 * Inputs need to get:
 * 1. Annual income
 * 2. Expected mortgage
 * 3. House price preference
 * 4. Down payment ratio / down payment amount
 */

var incomeTax = require('./incomeTax.js');

var DEFAULT_VALUE_PROFILE1 = { // profile 1
  rent :         1200,
  utilities: {
    electricity :   35,
    network :       39,
    transport:      156,
    houseInsurance: 20,
    carInsurance:   60,
    gas:            60,
    cellphone:      130,
    utilitiesSumUp = function(){
      return this.electricity + this.network + this.transport + this.houseInsurance
      + this.carInsurance + this.gas + this.cellphone;
    }  
  },
  studentLoad:  600, // two people
  mortgage:     0,
  food_and_shopping:  800,
  houseMaintenance: 0
}

 /* 
  * Profile1 -- rent appartment, without leased car
  * rent includes heating
  */
var rent = input.rent || DEFAULT_VALUE_PROFILE1.rent;
var utilities = input.utilities || DEFAULT_VALUE_PROFILE1.utilities;