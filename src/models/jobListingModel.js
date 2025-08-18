import {DataTypes} from 'Sequelize'
import sequelize from '../db/db-connection.js'



const JobListing = sequelize.define('joblisting', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    companyId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    jobTitle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobDescription:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    employmentType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobLocation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobSalary:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    jobApplicationUrl:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl:true
        }
    },
    jobStatus:{
        type:DataTypes.ENUM("Open", "Closed", "Paused"),
        allowNull:false,
        defaultValue:"Open"
    }
})


export default JobListing