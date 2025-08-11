import {DataTypes} from 'Sequelize'
import sequelize from '../db/db-connection'


const fileAttachment = sequelize.define('fileAttachment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    jobApplicationId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    fileName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    filePath:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mimeType:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


export default fileAttachment