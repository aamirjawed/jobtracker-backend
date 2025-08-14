import {DataTypes} from 'Sequelize'
import sequelize from '../db/db-connection.js'


const Reminder = sequelize.define('reminder', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    reminderName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    reminderMessage:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    reminderDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    reminderTime:{
        type:DataTypes.TIME,
        allowNull:false
    },
    reminderStatus:{
        type:DataTypes.ENUM("Pending", "Sent","Failed"),
        allowNull:false
    }
})

export default Reminder