function createTimeslot(){
    const numTimeslot = 22 // 1 timeslot = 30 minutes, starts from 11am to 10pm
    const timeslots = new Array(numTimeslot); 
    for (let i=0; i<numTimeslot; i++) {
        timeslots[i] = []; // array of dates reservation is made for that particular time slots
    }
    return timeslots;
}

class Table{

    constructor(numSeats, timeslots){
        this.numSeats = numSeats;
        this.timeslots = timeslots;
    }

    reserve(date, timeIndex) { //reserve for 2 hours (4 time slots)
        this.timeslots[timeIndex].push(date);
        this.timeslots[timeIndex + 1].push(date);
        this.timeslots[timeIndex + 2].push(date);
        this.timeslots[timeIndex + 3].push(date);
    }


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





const partySize = document.getElementById("partySize");
const date = document.getElementById("date");
const time = document.getElementById("time");
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const timeNotFound = document.getElementById("timeNotFound");
const timeOne = document.getElementById("timeOne");
const timeTwo = document.getElementById("timeTwo");
const timeThree = document.getElementById("timeThree");
const timeFour = document.getElementById("timeFour");
const timeFive = document.getElementById("timeFive");
const optionOne = document.getElementById("optionOne");
const optionTwo = document.getElementById("optionTwo");
const optionThree = document.getElementById("optionThree");
const optionFour = document.getElementById("optionFour");
const optionFive = document.getElementById("optionFive");


var tableIndex;
var timeIndex;
var timeslotFound;
let availableTimes = [];



form1.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    console.log("check button clicked")
    availableTimes = [];
    
    timeIndex = getTimeIndex(time.value);
    console.log("time index found:" + timeIndex);


    timeslotFound = false;
    tableIndex = searchTable(+(partySize.value)); 

    displayTimeOptions();
})

form2.addEventListener(`submit`, (e)=>{
    console.log("reserve button clicked")
    e.preventDefault();

    let selectedTimeIndex = checkOptionSelected();
    

    console.log(tableIndex);
    console.log(typeof(tables[tableIndex]));
    tables[tableIndex].reserve(date, selectedTimeIndex);

    console.log((tables[8].timeslots));
    console.log((tables[9].timeslots));
    console.log((tables[10].timeslots));
    console.log(typeof(date.value));
})


function getTimeIndex(time){
    var a = time.split(':');
    a[0] = a[0] - 11; //offset by opening time
    return Math.round(((+a[0]) * 60 + (+a[1])) * 2 / 60);
}



function searchTable(num){
    if (num <= 2) {
        return 0;
    } else if (num <= 4) {
        return 4;
    } else {
        return 8;
    }
}

function searchTimeslot(arr, date){
    console.log(arr.length);
    for (let a = 0; a < arr.length; a++){
        if (arr[a] == date)
            return false;
    }
    return true;
}

function translateToTime(i){
    let hour = Math.floor(11 + i / 2); 
    let time = hour.toString();

    if (i % 2 == 0){
        return time + ":00";
    } else {
        return time + ":30";
    }

}

function displayTimeOptions(){
    console.log("displaying time options");
    
    
    
    //form2.style.display = `block`;
    // let optionDisplayed = false;

    while (availableTimes.length == 0 && tableIndex < numTables){
        for (var i = -2; i <= 2; i++) {
            if ((timeIndex+i >= 0) && (timeIndex+i < 22)) {
                //console.log(timeIndex);
                //console.log(tableIndex);
                timeslotFound = searchTimeslot(tables[tableIndex].timeslots[timeIndex+i], date);
                if (timeslotFound) {
                    //optionDisplayed = true;
                    availableTimes.push(timeIndex+i);
                    console.log("pushed");



                    //console.log("time displayed, pls choose")
                    // if (optionOne.style.display == `none`) {
                    //     console.log("option 1");
                    //     timeOne.innerHTML = translateToTime(timeIndex+i);
                    //     optionOne.style.display = `block`;
                    // } else if (optionTwo.style.display == `none`) {
                    //     console.log("option 2");
                    //     timeTwo.innerHTML = translateToTime(timeIndex+i);
                    //     optionTwo.style.display = `block`;
                    // } else if (optionThree.style.display == `none`) {
                    //     console.log("option 3");
                    //     timeThree.innerHTML = translateToTime(timeIndex+i);
                    //     optionThree.style.display = `block`;
                    // } else if (optionFour.style.display == `none`) { 
                    //     console.log("option 4");                       
                    //     timeFour.innerHTML = translateToTime(timeIndex+i);
                    //     optionFour.style.display = `block`;
                    // } else if (optionFive.style.display == `none`) {
                    //     console.log("option 5");
                    //     timeFive.innerHTML = translateToTime(timeIndex+i);
                    //     optionFive.style.display = `block`;
                    // }
                }
            }
        }   
        if(availableTimes.length==0) {
            tableIndex++;
        }
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
        

    }
        


    
    
    // timeOne.innerHTML = translateToTime(timeIndex-2);
    // timeTwo.innerHTML = translateToTime(timeIndex-1);
    // timeThree.innerHTML = translateToTime(timeIndex);
    // timeFour.innerHTML = translateToTime(timeIndex+1);
    // timeFive.innerHTML = translateToTime(timeIndex+2);

    
}


function reset(){
    console.log("reset");
    optionOne.style.display == `none`;
    optionTwo.style.display == `none`;
    optionThree.style.display == `none`;
    optionFour.style.display == `none`;
    optionFive.style.display == `none`;

}

function checkOptionSelected() {
    console.log("cked fhdja");
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