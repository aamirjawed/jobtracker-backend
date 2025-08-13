import JobApplication from "../models/jobApplicationModel.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js'

export const newJobApplication = async (req, res) => {
    const {companyName, jobTitle, applicationDate, status, note}  = req.body


    if(!companyName || !jobTitle || !applicationDate || !status){
        return res.status(400).json({
            success:false,
            error:"Missing fields",
            message:"All fields are required"
        })
    }

    try {
        const id = req.userId
        let fileUrl = null

        if(req.file){
            const cloudinaryresponse = await uploadOnCloudinary(req.file.path)
                if( cloudinaryresponse){
                    fileUrl = cloudinaryresponse.secure_url
                
            }
        }

        /* The code `const newApplication = JobApplication.create({...})` is creating a new job
        application entry in the database using the `JobApplication` model. It is assigning values
        to the fields `companyName`, `jobTitle`, `applicationDate`, `status`, `note`, and `userId`
        based on the data received from the request body (`req.body`) and the authenticated user's
        ID (`req.userId`). This operation is typically used to save the new job application details
        in the database for further processing and retrieval. */
        const newApplication = await JobApplication.create({
            companyName:companyName,
            jobTitle:jobTitle,
            applicationDate:applicationDate,
            status:status,
            note:note,
            fileUrl:fileUrl,
            userId:id
        })

        /* This part of the code is checking if the variable `newApplication` is falsy, which means
        that the creation of the new job application entry in the database was not successful. If
        `newApplication` is falsy, it means there was an issue during the creation process. In this
        case, the code returns a response with a status code of 500 (Internal Server Error) along
        with a JSON object containing details about the error, such as a message indicating that
        something went wrong while creating the new job entry. This helps to handle and communicate
        errors that occur during the creation of a new job application entry. */
        if(!newApplication){
            return res.status(500).json({
                success:false,
                error:"Internal Server Error",
                message:"Something went wrong while creating new job entry"
            })
        }


        res.status(201).json({
            success:true,
            message:"New application added successfully",
            data:newApplication
        })
    } catch (error) {
        console.log("Error in new job application in job application controller", error.message)
        res.status(500).json({
            success:false,
            error:"Internal Server error",
            message:"Something went wrong"
        })
    }
}


export const viewAllApplications = async (req, res) => {
    try {

        const id = req.userId
        /* This code snippet is using the `JobApplication` model to query the database for all job
        applications that belong to a specific user ID (`userId`). Here's a breakdown of what each
        part of the code is doing: */
        
        const applications = await JobApplication.findAll({
            where:{userId:id},
            
            order:[['createdAt','DESC']]

        })
        

        res.status(200).json({
            success:true,
            message:"All applications retrieved",
            data:applications
        })
    } catch (error) {
        console.log("Error in view all application in job application controller", error.message)
        res.status(500).json({
            success:false,
            error:"Internal server error",
            message:"Something went wrong"
        })
    }
}


export const getSpecificApplication  = async(req, res) => {
    const id = req.userId
    const applicationId = req.params.applicationId

    try {
        const application = await JobApplication.findOne({
            where:{userId:id, id:applicationId}
        })

        if(!application){
            return res.status(404).json({
                success:false,
                message:"Application not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Application retrieved successfully",
            data:application
        })
    } catch (error) {
        console.log("Error in get specific application in job application controller", error.message)
        console.log("Full error of get specific application", error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching the application"
        })
    }
}


export const updateApplication = async (req, res) => {
    const id = req.userId;
    const applicationId  = req.params.applicationId

    try {
        const application = await JobApplication.findOne({
            where:{userId:id, id:applicationId}
        })

        if(!application){
            return res.status(404).json({
                success:false,
                message:"Application not found or you don't have permission to update"
            })
        }

        const updateData = {...req.body}


        await application.update(updateData)

        return res.status(200).json({
            success:true,
            message:"Application updated successfully",
            data:application
        })
    } catch (error) {
        console.log("Error in update application in job application controller", error.message)
        console.log("Full error of update controller", error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating the application"
        })
    }
}


export const deleteApplication  = async(req, res)=> {
    const id = req.userId
    const applicationId  = req.params.applicationId

    try {
        const application = await JobApplication.findOne({
            where:{userId:id, id:applicationId}
        })

        if(!application){
            return res.status(404).json({
                success:false,
                message:"Application not found or you don't have permission to delete"
            })
        }

        await application.destroy()

        return res.status(200).json({
            success:true,
            message:"Application deleted successfully",
            data:application
        })
    } catch (error) {
        console.log("Error in delete application in job application controller", error.message)
        console.log("Full error in delete application", error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting"
        })
    }
}