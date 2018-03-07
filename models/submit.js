<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    const Submit = sequelize.define("Submit", {
        student_id: DataTypes.INTEGER,
        homework_id: DataTypes.INTEGER,
        url: DataTypes.STRING,
        grade: DataTypes.STRING
    }, { underscored: true });

    Submit.associate = function(models) {
        Submit.hasOne(models.Student, { foreignKey: 'id', sourceKey: 'student_id' }, {
            onDelete: "cascade"
        });
        Submit.hasOne(models.Homework, { foreignKey: 'id', sourceKey: 'homework_id' }, {
            onDelete: "cascade"
        });
    };
    return Submit;
=======
module.exports = function(sequelize, DataTypes){
	const Submit = sequelize.define("Submit", {
		url: DataTypes.JSON,
		grade: DataTypes.STRING
		// ,
		// created_at: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: 'CURRENT_TIMESTAMP'
		// },
		// updated_at: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
		// }
	}, {underscored: true});

	
	return Submit;
>>>>>>> c83fdb7b3fad2cf36c53821b9436f4b1de5e241a
}