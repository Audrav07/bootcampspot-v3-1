module.exports = function(sequelize, DataTypes) {
    const Homework = sequelize.define("Homework", {
        due: DataTypes.DATE,
        title: DataTypes.STRING,
        week: DataTypes.INTEGER
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

    Homework.associate = function(models) {
        Homework.hasOne(models.Submit, {
            onDelete: "cascade"
        });
    };
    return Homework;
}

// {foreignKey: 'id', targetKey: 'homework_id'},