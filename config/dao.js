var connection = require("../config/connection.js");

const dao = {
	//get all students
	allStudent: function(cb){
		const queryString = `SELECT * FROM Students`;
		connection.query(queryString, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting all student data');
	      		cb(result);
	      	}
	    });
	},
	//get current student
	oneStudent: function(email, cb){
		const queryString = `SELECT * FROM Students WHERE user IS ?`;
		connection.query(queryString, email, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting data for student: ', email);
	      		cb(result);
	      	}
	    });
	},
	//get all homework data
	allHW: function(cb){
		const queryString = `SELECT * FROM Homeworks`;
		connection.query(queryString, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting all homework data');
	      		cb(result);
	      	}
	    });
	},
	//get homework from a specified week
	weekHW: function(week, cb){
		const queryString = `SELECT * FROM Homeworks WHERE week IS ?`;
		connection.query(queryString, week, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting homework data for week ', week);
	      		cb(result);
	      	}
	    });
	},
	//get all lesson data
	allLesson: function(cb){
		const queryString = `SELECT * FROM Lessons`;
		connection.query(queryString, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting all lesson data');
	      		cb(result);
	      	}
	    });
	},
	//get lesson data from a sepcified week
	weekLesson: function(week, cb){
		const queryString = `SELECT * FROM Lessons WHERE week IS ?`;
		connection.query(queryString, week, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('getting lesson data for week ', week);
	      		cb(result);
	      	}
	    });
	},
	//turn in homework to Submits table
	turnIn: function(submit, cb){
		const queryString = `INSERT INTO Submits (student_id, homework_id, url) VALUES (?)`;
		connection.query(queryString, submit, function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('homework turned in');
	      		cb(result);
	      	}
	    });
	},
	//mark at attendence as present
	present: function(student, lesson, cb){
		const queryString = `INSERT INTO Attends (student_id, lesson_id) VALUES (?,?)`;
		connection.query(queryString, [student, lesson], function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log('marked as present');
	      		cb(result);
	      	}
	    });
	},
	//delete data using id
	delete: function(table, id, cb){
		const queryString = `DELETE FROM ? WHERE id IS ?`;
		connection.query(queryString, [table, id], function(err, result) {
	      	if (err) {
	        	throw err;
	      	}
	      	else {
	      		console.log(`deleted id: ${id} from table: ${table}`);
	      		cb(result);
	      	}
	    });
	}


}

//give access to DAO in other files
module.exports = dao;
