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