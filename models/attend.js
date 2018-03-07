<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    const Attend = sequelize.define("Attend", {
        lesson_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER
    }, { underscored: true });

    Attend.associate = function(models) {
        Attend.hasMany(models.Lesson, { foreignKey: 'id', sourceKey: 'Lesson_id' }, {
            onDelete: "cascade"
        });
        Attend.hasMany(models.Student, { foreignKey: 'id', sourceKey: 'student_id' }, {
            onDelete: "cascade"
        });
    };
    return Attend;
};
=======
module.exports = function(sequelize, DataTypes){
	const Attend = sequelize.define("Attend", {
		// created_at: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: 'CURRENT_TIMESTAMP'
		// },
		// updated_at: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
		// }
	}, {underscored: true});

	
	return Attend;
}
>>>>>>> c83fdb7b3fad2cf36c53821b9436f4b1de5e241a
