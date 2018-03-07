module.exports = function(sequelize, DataTypes) {
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
    }, { underscored: true });

    Lesson.associate = function(models) {
        Lesson.hasOne(models.Attend, {
            onDelete: "cascade"
        });
    };

    return Lesson;
}

// {foreignKey: 'id', targetKey: 'lesson_id'},