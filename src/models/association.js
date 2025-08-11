import fileAttachment from "./fileAttachmentModel";
import JobApplication from "./jobApplicationModel";
import User from "./userModel";




User.hasMany(JobApplication, {foreignKey:"userId", onDelete:"CASCADE"})
JobApplication.belongsTo(User, {foreignKey:"userId"})



JobApplication.hasMany(fileAttachment, {foreignKey:'jobApplicationId', onDelete:"CASCADE"})
fileAttachment.belongsTo(JobApplication, {foreignKey:'jobApplicationId'})


export default {User, JobApplication}