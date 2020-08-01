/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = (array) => {
    let obj = {};
    obj['firstName'] = `${array[0]}`;
    obj['familyName'] = `${array[1]}`;
    obj['title'] = `${array[2]}`;
    obj['payPerHour'] = array[3];
    obj['timeInEvents'] = [];
    obj['timeOutEvents'] = [];
    return obj;
}

const createEmployeeRecords = (array) => {
    let new_arr = [];
    array.forEach((record) => {
        new_arr.push(createEmployeeRecord(record));
    })
    return new_arr;
}

let createTimeInEvent = function(dateString){
    let dateTime = dateString.split(' ');
    this['timeInEvents'].push({
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    })
    return this;
}
//createTimeInEvent.bind(this);

let createTimeOutEvent = function(dateString) {
    let dateTime = dateString.split(' ');
    this['timeOutEvents'].push({
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    })
    return this;
}

let hoursWorkedOnDate = function(dateString) {
    let clockIn = this.timeInEvents.find(function(date){
        return date.date === dateString;
    })

    let clockOut = this.timeOutEvents.find(function(date){
        return date.date === dateString;
    })

    return (clockOut.hour - clockIn.hour) / 100;
}

let wagesEarnedOnDate = function(dateString) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateString);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    let answer =  srcArray.find(employee => employee['firstName'] === firstName);
    return answer;
}

let calculatePayroll = function(array) {
    return array.reduce(function(acc, employeeRecord){
        return acc + allWagesFor.call(employeeRecord)
    }, 0)
}

// mdn Array.reduce;