import JobApplication from "../models/jobApplicationModel.js"

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
            attributes:['companyName', 'jobTitle', 'status', 'applicationDate', 'note'],
            order:['createdAt','DESC']

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