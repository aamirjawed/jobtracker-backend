import {DataTypes} from 'Sequelize'
import sequelize from '../db/db-connection.js'




const JobApplication = sequelize.define('jobApplication', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobTitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    applicationDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("Pending", "Success", "Rejected", "Interview", "Selected"),
        allowNull:false,
        defaultValue:"Pending"
    },
    note:{
        type:DataTypes.STRING,
        allowNull:true
    }
})


export default JobApplication