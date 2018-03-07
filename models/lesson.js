module.exports = function(sequelize, DataTypes) {
    const Lesson = sequelize.define("Lesson", {
        date: DataTypes.DATE,
        week: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, { underscored: true });
    return Lesson;
};