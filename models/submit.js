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
}