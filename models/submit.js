module.exports = function(sequelize, DataTypes){
	const Submit = sequelize.define("Submit", {
		student_id: DataTypes.INTEGER,
		homework_id: DataTypes.INTEGER,
		url: DataTypes.JSON,
		grade: DataTypes.STRING
	}, {underscored: true});

	Submit.associate = function(models){
		Submit.hasOne(models.Student, {foreignKey: 'id', sourceKey: 'student_id'}, {
			onDelete: "cascade"
		});
		Submit.hasOne(models.Homework, {foreignKey: 'id', sourceKey: 'homewoek_id'}, {
			onDelete: "cascade"
		});
	};
	return Submit;
}