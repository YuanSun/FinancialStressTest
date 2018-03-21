function DailySpend(rent, foodAndShopping, extra) {
    this.rent = rent;
    this.foodAndShopping = foodAndShopping;
    this.extra = extra;

    this.total = 0;
    arguments.array.forEach(element => {
        if(typeof(element) ==='number'){
            total += element;
        }
    });
}

function HouseSpend(houseMortgage, houseInsurance, houseMaintenance, extra) {
    this.houseMortgage = houseMortgage;
    this.houseInsurance = houseInsurance;
    this.houseMaintenance = houseMaintenance;
    this.extra = extra;

    this.total = 0;
    arguments.array.forEach(element => {
        if(typeof(element) ==='number'){
            total += element;
        }
    });
}

function CarSpend(leaase, loan, carInsurance, maintenance, extra) {
    this.lease = lease;
    this.loan = loan;
    this.carInsurance = carInsurance;
    this.maintenance = maintenance;
    this.extra = extra;

    this.total = 0;
    arguments.array.forEach(element => {
        if(typeof(element) ==='number'){
            total += element;
        }
    });
}

function Utilities(electricity, network, transport, houseInsurance, carInsurance, gas, cellphone) {
    this.electricity = electricity;
    this.network = network;
    this.transport = transport;
    this.houseInsurance = houseInsurance;
    this.carInsurance = carInsurance;
    this.gas = gas;
    this.cellphone = cellphone;

    this.total = 0;
    arguments.array.forEach(element => {
        if(typeof(element) ==='number'){
            total += element;
        }
    });
}

function Loan (studentLoan, creditCardLoan, extra) {
    this.studentLoan = studentLoan;
    this.creditCardLoan = creditCardLoan;
    this.extra = extra;

    this.total = 0;
    arguments.array.forEach(element => {
        if(typeof(element) ==='number'){
            total += element;
        }
    });
}

module.exports = {
    load: Loan,
    dailySpend:  DailySpend,
    houseSpend: HouseSpend,
    utilities: Utilities,
    carSpend: CarSpend
}