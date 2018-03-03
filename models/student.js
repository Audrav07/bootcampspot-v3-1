module.exports = function(sequelize, DataTypes){
	const Student = sequelize.define("Student", {
		user: DataTypes.STRING,
		password: DataTypes.STRING,
		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		class: DataTypes.STRING
	}, {underscored: true});
	return Student;
}