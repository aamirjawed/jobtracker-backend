import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'



export const profileManageController = async(req, res) => {
    const {fullName, email, phoneNumber, password, careerGoals}  = req.body


    try {
        const id = req.userId
        
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({
                success:false,
                error:"User not found",
                message:"Unauthorized"
            })
        }

        const updateData  = {}

        if(fullName) updateData.fullName = fullName;
        if(email) updateData.email = email;
        if(phoneNumber) updateData.phoneNumber = phoneNumber;
        if(careerGoals) updateData.careerGoals = careerGoals


        if(password){
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }

        await user.update(updateData)

        const safeUser = user.toJSON();
        delete safeUser.password


        res.status(200).json({
            success:true,
            message:"Data updated successfully",
            data:safeUser
        })
        
    } catch (error) {
        console.log("Error in profile manager controller", error.message)
        res.status(500).json({
            success:false,
            error:"Internal server error",
            message:"Error while updating user info"
        })
    }
}