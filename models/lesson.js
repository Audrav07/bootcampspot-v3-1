<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    const Lesson = sequelize.define("Lesson", {
        date: DataTypes.DATE,
        week: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, { underscored: true });
    return Lesson;
};
=======
module.exports = function(sequelize, DataTypes){
	const Lesson = sequelize.define("Lesson", {
		date: DataTypes.DATE,
		week: DataTypes.INTEGER,
		time: DataTypes.STRING,
		title: DataTypes.STRING
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

	Lesson.associate = function(models){
		Lesson.hasOne(models.Attend,  {
			onDelete: "cascade"
		});
	};

	return Lesson;
}

// {foreignKey: 'id', targetKey: 'lesson_id'},
>>>>>>> c83fdb7b3fad2cf36c53821b9436f4b1de5e241a
