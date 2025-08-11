import JobApplication from "./jobApplicationModel";
import User from "./userModel";




User.hasMany(JobApplication, {foreignKey:"userId"})
JobApplication.belongsTo(User, {foreignKey:"userId"})


export default {User, JobApplication}