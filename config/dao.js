var connection = require("../config/connection.js");

const dao = {
    //get all student data from database
    allStudent: function(callback){
        const queryString = `SELECT * FROM Students`;
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting all student data');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //get a single student's data
    oneStudent: function(user, callback){
        const queryString = `SELECT * FROM Students WHERE ?`;
        connection.query(queryString, {user}, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting data for student: ', user);
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //get all homework data
    allHW: function(callback){
        const queryString = `SELECT * FROM Homeworks`;
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting all homework data');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //get homework from a specified week
    weekHW: function(week, callback){
        const queryString = `SELECT * FROM Homeworks WHERE ?`;
        connection.query(queryString, {week}, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting homework data for week ', week);
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //get all lesson data
    allLesson: function(callback){
        const queryString = `SELECT * FROM Lessons`;
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting all lesson data');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //get lesson data from a sepcified week
    weekLesson: function(week, callback){
        const queryString = `SELECT * FROM Lessons WHERE week IS ?`;
        connection.query(queryString, week, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('getting lesson data for week ', week);
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    // create new student (sign up)
    signUp: function(newStudent, callback){
        const queryString = `INSERT INTO Students (user, password, first_name, last_name, section) VALUES (?,?,?,?,?)`;
        connection.query(queryString, [newStudent.user, newStudent.password, newStudent.first_name, newStudent.last_name, newStudent.section], function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('homework turned in');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //turn in homework to Submits table
    turnIn: function(submit, cb){
        const queryString = `INSERT INTO Submits (student_id, homework_id, url) VALUES (?)`;
        connection.query(queryString, {submit}, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('homework turned in');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //Alternate version of turning in a new homework
    // turnIn: function(submit, cb){
    //  const queryString = `INSERT INTO Submits (student_id, homework_id, url) VALUES (?,?,?)`;
    //  connection.query(queryString, [submit.student_id, submit.homework_id, submit.url], function(err, result) {
    //          if (err) {
    //          throw err;
    //          }
    //          else {
    //              console.log('homework turned in');
    //              //callback controls when the request is run
    //              cb(result);
    //          }
    //     });
    // },
    //mark at attendence as present
    present: function(student, lesson, callback){
        const queryString = `INSERT INTO Attends (student_id, lesson_id) VALUES (?,?)`;
        connection.query(queryString, [student, lesson], function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('marked as present');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //did a student attend a specified class
    attendance: function(student, lesson, callback){
        const queryString = `SELECT * FROM Attends WHERE student_id = ? AND lesson_id = ?`;
        connection.query(queryString, [student, lesson], function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log('marked as present');
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    //delete data using id
    delete: function(table, id, callback){
        const queryString = `DELETE FROM ?? WHERE id = ?`;
        connection.query(queryString, [table, id], function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log(`deleted id: ${id} from table: ${table}`);
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    getWeeks: function(callback){
        const queryString = `SELECT id, start FROM Weeks`;
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log(`get all week info`);
                //callback controls when the request is run
                callback(result);
            }
        });
    },
    updatePassword: function(password, student, callback){
        const queryString = `UPDATE Students SET password = ? WHERE id = ?`;
        connection.query(queryString, [password, student],function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log(`get all week info`);
                //callback controls when the request is run
                callback(result);
            }
        });
    }


}

//give access to DAO in other files
module.exports = dao;
