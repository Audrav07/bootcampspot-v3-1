//////////////////////need to grab the user data
// let curr;
// let first;
// let last;
// let firstDay;
// let lastDay;
let userData = {};

function getUserData() {
    $.get("/api/user", function(res) {
        userData = res;
        console.log("User Data: ", userData);
    });
}
getUserData();

// const moment = require("moment");

// vars for session and homework containers
let sessionTable = $("#table-session");
let hmwkTable = $("#table-homework");
getLessons();
getHomework();

// determines the first and last days of the week.
function currentWeek(length) {
    //   curr = new Date(); // get current date
    //   first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    //   last = first + length; // last day is the first day + 6
    //   firstDay = new Date(curr.setDate(first));
    //   lastDay = new Date(curr.setDate(last));
    //   console.log(firstDay + " firstday", lastDay + " lastday");
}

// Function for creating a new list row for lessons
function createLessonRow(lessonData) {
    // format date
    //   let freshDate = moment(lessonData.date).format("ddd MMMM Do YYYY");

    var newTr = $("<tr>");
    newTr.attr("style", "border-bottom: 1px solid #e0e0e0");
    newTr.append(`<td data-title="${lessonData.title}">${lessonData.title}</td>`);
    newTr.append(
        `<td data-title="${
      lessonData.date
      // }"><span style="float:right">${freshDate} ${
    }"><span style="float:right">${lessonData.date} ${
      lessonData.time
    } MDT</span></td>`
    );
    newTr.append(`<a class="waves-effect waves-light btn"><i class="material-icons" id="checkIn" class="${
    lessonData.id
  }" style="float:right">playlist_add_check</i></a>
      </td>
  </tr>`);

    return newTr;
}

function getLessons() {
    $.get("/api/lessons").then(function(res) {
        console.log(res);
        // get the current week
        let curr;
        let first;
        let last;
        let firstDay;
        let lastDay;
        curr = new Date(); // get current date

        first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        last = first + 6; // last day is the first day + 6

        firstDay = new Date(curr.setDate(first));
        lastDay = new Date(curr.setDate(last));
        console.log(firstDay + " firstday", lastDay + " lastday");
        // currentWeek(6);
        // curr = new Date(); // get current date

        // first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        // last = first + 6; // last day is the first day + 6

        // firstDay = new Date(curr.setDate(first));
        // lastDay = new Date(curr.setDate(last));
        // console.log(firstDay + " firstday", lastDay + " lastday");
        let lessonsWeekArr = [];

        for (var i = 0; i < res.length; i++) {
            let dbFormatDate = new Date(res[i].date);
            if (
                dbFormatDate.getTime() >= firstDay.getTime() &&
                dbFormatDate.getTime() <= lastDay.getTime()
            ) {
                lessonsWeekArr.push(res[i]);
            }
        }
        console.log(lessonsWeekArr, "here are lessons matching our dates");

        let rowsToAdd = [];
        for (var i = 0; i < lessonsWeekArr.length; i++) {
            rowsToAdd.push(createLessonRow(lessonsWeekArr[i]));
        }
        console.log("Rows to add: ", rowsToAdd);
        sessionTable.append(rowsToAdd);
    });
}

//////////////// HOMEWORK
function createHomeworkRow(homeworkData) {
    // format date
    //   let freshDate = moment(lessonData.date).format("ddd MMMM Do YYYY");

    var newTr = $("<tr>");
    newTr.attr("style", "border-bottom: 1px solid #e0e0e0");
    newTr.append(
        `<td data-title="${homeworkData.title}">${homeworkData.title}</td>`
    );
    newTr.append(
        `<td data-title="${
      homeworkData.date
      // }"><span style="float:right">${freshDate} ${
    }"><span style="float:right">${homeworkData.due}</span></td>`
    );
    newTr.append(`<a class="waves-effect waves-light btn"><i class="material-icons" id="checkIn" class="${
    homeworkData.id
  }" style="float:right">playlist_add_check</i></a>
        </td>
    </tr>`);

    return newTr;
}

function getHomework() {
    $.get("/api/homeworks").then(function(res) {
        console.log(res);
        // get the current week
        let curr;
        let first;
        let last;
        let firstDay;
        let lastDay;
        curr = new Date(); // get current date

        first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        last = first + 14; // last day is the first day + 6

        firstDay = new Date(curr.setDate(first));
        lastDay = new Date(curr.setDate(last));
        console.log(firstDay + " firstday", lastDay + " lastday");
        // currentWeek(13);

        let hmwkWeekArr = [];

        for (var i = 0; i < res.length; i++) {
            let dbFormatDate = new Date(res[i].due);
            if (
                dbFormatDate.getTime() >= firstDay.getTime() &&
                dbFormatDate.getTime() <= lastDay.getTime()
            ) {
                hmwkWeekArr.push(res[i]);
            }
        }
        console.log(hmwkWeekArr, "here are homeworks matching our dates");

        let rowsToAdd = [];
        for (var i = 0; i < hmwkWeekArr.length; i++) {
            rowsToAdd.push(createHomeworkRow(hmwkWeekArr[i]));
        }
        console.log("Rows to add: ", rowsToAdd);
        hmwkTable.append(rowsToAdd);
    });
}