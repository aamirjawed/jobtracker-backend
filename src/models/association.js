import CompanyName from "./companyModel";
import fileAttachment from "./fileAttachmentModel";
import JobApplication from "./jobApplicationModel";
import JobListing from "./jobListingModel";
import Reminder from "./reminderModel";
import User from "./userModel";




User.hasMany(JobApplication, {foreignKey:"userId", onDelete:"CASCADE"})
JobApplication.belongsTo(User, {foreignKey:"userId"})



JobApplication.hasMany(fileAttachment, {foreignKey:'jobApplicationId', onDelete:"CASCADE"})
fileAttachment.belongsTo(JobApplication, {foreignKey:'jobApplicationId'})


User.hasMany(Reminder, {foreignKey:"userId", onDelete:"CASCADE"})
Reminder.belongsTo(User, {foreignKey:"userId"})

JobListing.belongsTo(CompanyName, {foreignKey:"companyId", onDelete:"CASCADE"})
CompanyName.hasMany(JobListing, {foreignKey:"companyId"})


export default {User, JobApplication, Reminder, JobListing, CompanyName}