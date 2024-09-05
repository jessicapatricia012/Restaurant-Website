var tableIndex;
var timeIndex;
var timeslotFound;
let availableTimes = [];
const numTimeslot = 22 // 1 timeslot = 30 minutes, starts from 11am to 10pm

var custName = document.getElementById("name");
var phone = document.getElementById("phone");
var partySize = document.getElementById("partySize");
var date = document.getElementById("date");
var time = document.getElementById("time");
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var timeNotFound = document.getElementById("timeNotFound");
var timeOne = document.getElementById("timeOne");
var timeTwo = document.getElementById("timeTwo");
var timeThree = document.getElementById("timeThree");
var timeFour = document.getElementById("timeFour");
var timeFive = document.getElementById("timeFive");
var optionOne = document.getElementById("optionOne");
var optionTwo = document.getElementById("optionTwo");
var optionThree = document.getElementById("optionThree");
var optionFour = document.getElementById("optionFour");
var optionFive = document.getElementById("optionFive");



class Table{
    constructor(numSeats, timeslots){
        this.numSeats = numSeats;
        this.timeslots = timeslots;
    }

    reserve(date, timeIndex) { //reserve for 2 hours (4 time slots)
        this.timeslots[timeIndex].push(date + " " + custName.value + " " + phone.value);
        for (var i = 1; i <= 3; i++){
            if (timeIndex + i < numTimeslot)
                this.timeslots[timeIndex + i].push(date);
        }
        
        //document.getElementById('reserveBox').style.display = "none";
        //document.getElementById('reservedBox').style.display = "block";
        
        localStorage.setItem("table " + tableIndex + ": " + timeIndex, JSON.stringify(this.timeslots[timeIndex]));
        localStorage.setItem("table " + tableIndex + ": " + (timeIndex+1), JSON.stringify(this.timeslots[timeIndex+1]));
        localStorage.setItem("table " + tableIndex + ": " + (timeIndex+2), JSON.stringify(this.timeslots[timeIndex+2]));
        localStorage.setItem("table " + tableIndex + ": " + (timeIndex+3), JSON.stringify(this.timeslots[timeIndex+3]));

        
        for(var i=0; i<numTables;i++) 
            console.log(tables[i].timeslots);
        

        window.localStorage.clear();
    }
}


function createTimeslot(){
    
    const timeslots = new Array(numTimeslot); 
    for (let i=0; i<numTimeslot; i++) {
        timeslots[i] = []; // array of dates reservation is made for that particular time slots
    }
    return timeslots;
}

const tables = [];
let numTables = 12;

for (let i=0; i<4; i++) { //4 tables
    tables[i] = new Table(2, createTimeslot());
}
for (let i=4; i<8; i++) { //4 tables
    tables[i] = new Table(4, createTimeslot());
}
for (let i=8; i<numTables; i++) { //4 tables
    tables[i] = new Table(6, createTimeslot());
}



form1.addEventListener(`submit`, (e)=>{
    e.preventDefault();

    reset();
    
    timeIndex = getTimeIndex(time.value);
    timeslotFound = false;
    tableIndex = searchTable(+(partySize.value)); 

    displayTimeOptions();
})

form2.addEventListener(`submit`, (e)=>{
    e.preventDefault();

    let selectedTimeIndex = checkOptionSelected();

    tables[tableIndex].reserve(date.value, selectedTimeIndex);
    
})



function getTimeIndex(time){
    var a = time.split(':');
    a[0] = a[0] - 11; //offset by opening time
    return Math.round(((+a[0]) * 60 + (+a[1])) * 2 / 60);
}

function searchTable(num){
    if (num <= 2) 
        return 0;
    else if (num <= 4) 
        return 4;
    else 
        return 8;
}

function searchTimeslot(arr, date){
    for (let a = 0; a < arr.length; a++)
        if (arr[a].substr(0,10) == date)
            return false;
    return true;
}

function translateToTime(i){
    let hour = Math.floor(11 + i / 2); 
    let time = hour.toString();

    if (i % 2 == 0)
        return time + ":00";
    else 
        return time + ":30";
}

function displayTimeOptions(){
    
    while (availableTimes.length == 0 && tableIndex < numTables){
        for (var i = -2; i <= 2; i++) {
            if ((timeIndex+i >= 0) && (timeIndex+i < 22)) {
                timeslotFound = searchTimeslot(tables[tableIndex].timeslots[timeIndex+i], date.value);
                if (timeslotFound) {
                    availableTimes.push(timeIndex+i);
                }
            }
        }   
        if(availableTimes.length == 0) 
            tableIndex++;
    }


    if (availableTimes.length == 0) {
        timeNotFound.innerHTML = "No tables available";
        form2.style.display = `none`;
    } else {
        timeOne.innerHTML = translateToTime(availableTimes[0]);
        optionOne.style.display = `block`;
        if (availableTimes.length > 1) {
            timeTwo.innerHTML = translateToTime(availableTimes[1]);
            optionTwo.style.display = `block`;
        }
        if (availableTimes.length > 2) {
            timeThree.innerHTML = translateToTime(availableTimes[2]);
            optionThree.style.display = `block`;
        }
        if (availableTimes.length > 3) {
            timeFour.innerHTML = translateToTime(availableTimes[3]);
            optionFour.style.display = `block`;
        }
        if (availableTimes.length > 4) {
            timeFive.innerHTML = translateToTime(availableTimes[4]);
            optionFive.style.display = `block`;
        }
        document.getElementById("reserveTimeBtn").style.display = 'block';
    }
}


function reset(){
    availableTimes = [];

    timeNotFound.innerHTML = "";
    form2.style.display = `block`;

    optionOne.style.display = `none`;
    optionTwo.style.display = `none`;
    optionThree.style.display = `none`;
    optionFour.style.display = `none`;
    optionFive.style.display = `none`;


    for (var i = 0; i < numTables; i++) {
        for (var j = 0; j < numTimeslot; j++) {
            if (localStorage.getItem("table " + i + ": " + j) != null)
            tables[i].timeslots[j] = JSON.parse(localStorage.getItem("table " + i + ": " + j));
        }
    }
}

function checkOptionSelected() {

    if (document.getElementById("radioOne").checked) 
        return availableTimes[0];
    else if (document.getElementById("radioTwo").checked) 
        return availableTimes[1];
    else if (document.getElementById("radioThree").checked) 
        return availableTimes[2];
    else if (document.getElementById("radioFour").checked) 
        return availableTimes[3];
    else if (document.getElementById("radioFive").checked) 
        return availableTimes[4];
    else 
        return 0;
}

