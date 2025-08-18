import {DataTypes} from 'Sequelize'
import sequelize from '../db/db-connection.js'

const CompanyName = sequelize.define("companies", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyDescription:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    companyWebsite:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isUrl:true
        }
    },
    companyLocation:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Company Location cannot be empty"
            }
        }
    },
    companyEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },

})


export default CompanyName