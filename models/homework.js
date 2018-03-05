module.exports = function(sequelize, DataTypes){
	const Homework = sequelize.define("Homework", {
		due: DataTypes.DATE,
		title: DataTypes.STRING,
		week: DataTypes.INTEGER
	}, {underscored: true});
	return Homework;
}