function createEmployeeRecord(arr) {
    return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    };
}

function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(arr => {
        return createEmployeeRecord(arr)
    });
}

function createTimeInEvent (timeIn) {
    let [date, hour] = timeIn.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
}

function createTimeOutEvent(timeOut) {
    let [date, hour] = timeOut.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => {
        return event.date === date;
    });
    let timeOut = this.timeOutEvents.find(event => {
        return event.date === date;
    });

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    return wage;
}

function calculatePayroll(records) {
    return records.reduce((memo, record) => {
        return memo + allWagesFor.call(record)
    }, 0);
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(employee => {
        return employee.firstName === name;
    });
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}