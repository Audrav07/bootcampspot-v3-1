<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    const Student = sequelize.define("Student", {
        user: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        class: DataTypes.STRING
    }, { underscored: true });
    return Student;
};
=======
module.exports = function(sequelize, DataTypes){
	const Student = sequelize.define("Student", {
		user: DataTypes.STRING,
		password: DataTypes.STRING,
		first_name: DataTypes.STRING,
		last_name: DataTypes.STRING,
		class: DataTypes.STRING,
		picture: {
			type:DataTypes.STRING,
			allowNull: true
		}
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

	Student.associate = function(models){
		Student.hasOne(models.Submit,  {
			onDelete: "cascade"
		});
		Student.hasOne(models.Attend,  {
			onDelete: "cascade"
		});
	};

	return Student;
}

// {foreignKey: 'id', targetKey: 'Lesson_id'},
// {foreignKey: 'id', targetKey: 'student_id'},
>>>>>>> c83fdb7b3fad2cf36c53821b9436f4b1de5e241a
