//////////////////////need to grab the user data

let userData = {};
function getUserData() {
  $.get("/api/user").then(function(res) {
    userData = res;
    console.log("User Data: ", userData);
  });
}
getUserData();

// vars for session and homework containers
let sessionTable = $("#table-session");
let hmwkTable = $("#table-homework");
getLessons();
getHomework();

// determines the first and last days of the week.
// function currentWeek(length) {
//   curr = new Date(); // get current date
//   first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
//   last = first + length; // last day is the first day + 6
//   firstDay = new Date(curr.setDate(first));
//   lastDay = new Date(curr.setDate(last));
//   console.log(firstDay + " firstday", lastDay + " lastday");
// }

// Function for creating a new list row for lessons
function createLessonRow(lessonData) {
  // format date = can't erquire moment bc it is a server side package and this is a client side file
  var newTr = $("<tr>");
  newTr.attr("style", "border-bottom: 1px solid #e0e0e0");
  newTr.append(`<td data-title="${lessonData.title}">${lessonData.title}</td>`);
  newTr.append(
    `<td data-title="${lessonData.date}"><span style="float:right">${
      lessonData.date
    } ${lessonData.time} MDT</span></td>`
  );
  newTr.append(`<td><a href="#"><i class="material-icons check-in" id="${
    lessonData.id
  }" style="float:right">playlist_add_check</i></a></td>
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
  var newTr = `<tr style", "border-bottom: 1px solid #e0e0e0"> <td data-title="${
    homeworkData.title
  }">${homeworkData.title}</td> 
  <td data-title="${homeworkData.date}"><span style="float:right">${
    homeworkData.due
  }</span></td><td><a href="#"><i class="material-icons md-36 submit-hmwk" id="${
    homeworkData.id
  }" style="float:right">description</i></a></td>
    </tr>`;

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

// click events for Attendance and Hmwk submit
document.on("click", ".check-in", regAttend);
document.on("click", ".submit-hmwk", submitHomework);

// function to handle click event for class attendance
function regAttend() {
  // need userID and lessonID to post into attendance table
  let attendData = {
    student_id: userData.id,
    lesson_id: $(this).id
  };
  console.log(attendData);
  $.post("/api/attend", attendData).then(attendView);

  ///////////////// once attendance is registered, disable the click event
  //   might be able to do this is in the attendView function
}

//////////////////// function for atendance button visuals and function ????
function attendView() {
  console.log("Thanks for neing here....");
}

////////////////////functino to submit homework
function submitHomework() {}
