import CompanyName from "../models/companyModel.js"
import JobListing from "../models/jobListingModel.js"
import {Op} from 'Sequelize'

export const listNewJob = async(req, res) => {
    try {
        const {companyId} = req.params

        const {jobTitle, jobDescription, employmentType, jobLocation, jobSalary, jobApplicationUrl, jobStatus} = req.body

        if(!jobTitle || !employmentType || !jobLocation || !jobSalary || !jobApplicationUrl || !jobStatus){
            return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
        }

        const newJob = await JobListing.create({
            
            jobTitle,
            jobDescription,
            employmentType,
            jobLocation,
            jobSalary,
            jobApplicationUrl,
            jobStatus,
            companyId
        })

        if(!newJob){
            return res.status(500).json({
                success:false,
                message:"Something went wrong while adding new job"
            })
        }

        res.status(201).json({
            success:true,
            message:"New job added",
            data:newJob
        })
        

    } catch (error) {
        console.log("Error in list new job in job listing controller", error.message)
        console.log("Full error:",error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export const getAllJobsForSpecificCompany = async(req, res) => {
   try {
     const {companyId} = req.params

     if(!companyId){
        return res.status(400).json({
            success:false,
            message:"No company is listed with this name of id"
        })
     }

     const company = await CompanyName.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
        data: null,
      });
    }

     const allJobsOfParticularCompany = await JobListing.findAll({
        where:{companyId:companyId}
     })

     if(allJobsOfParticularCompany.length ===0){
        return res.status(200).json({
            success:true,
            message:"No job found",
            data:allJobsOfParticularCompany
        })
     }

     return res.status(200).json({
        success:true,
        message:"List of jobs",
        data:allJobsOfParticularCompany
     })
   } catch (error) {
    console.log("Error in get all jobs for specific company",error.message)
    console.log("Full error", error)
    res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
   }


}


// implement filter like location, jobType filter the job
export const getAllJobs = async(req, res) => {
    try {
        const {jobTitle, jobLocation, jobStatus, employmentType} = req.query

        let filters = {};

        if(jobTitle){
            filters.jobTitle = {[Op.like]: `%${jobTitle}%`}
        }

        if(jobLocation){
            filters.jobLocation = {[Op.like]: `%${jobLocation}%`}
        }

        if(jobStatus){
            filters.jobStatus = jobStatus
        }

        if(employmentType){
            filters.employmentType = {[Op.like]: `%${employmentType}%`}
        }


        const jobs = await JobListing.findAll({
            where:filters,
            order:[["createdAt", "DESC"]]
        })

        if(jobs.length===0){
            return res.status(404).json({
                success:false,
                message:"No jobs found",
                data:null
            })
        }

        res.status(200).json({
            success:true,
            message:"All jobs",
            data:jobs
        })
    } catch (error) {
        console.log("Error in get all jobs in job listing controllers", error.message)
        console.log("Full error", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


export const detailsOfSingleJob = async (req, res) => {
    try {
        const {jobId} = req.params

        if(!jobId){
            return res.status(400).json({
                success:false,
                message:"Job does not exist"
            })
        }

        const job = await JobListing.findByPk(jobId)

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job doesn't exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"Successfully fetched the job",
            data:job
        })
    } catch (error) {
        console.log("Error in details of single job in job listing controller", error.message)
        console.log("Full error", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

export const updateDetailsOfSingleJob = async(req, res) => {
 try {
    const {jobId} = req.params

    const job = await JobListing.findByPk(jobId)

    if(!job){
        return res.status(404).json({
            success:false,
            message:"Job not found"
        })
    }

    const {
      jobTitle,
      jobDescription,
      employmentType,
      jobLocation,
      jobSalary,
      jobApplicationUrl,
      jobStatus,
    } = req.body;


   let isUpdated = false;

if (jobTitle && job.jobTitle !== jobTitle) {
  job.jobTitle = jobTitle;
  isUpdated = true;
}
if (jobDescription && job.jobDescription !== jobDescription) {
  job.jobDescription = jobDescription;
  isUpdated = true;
}
if (employmentType && job.employmentType !== employmentType) {
  job.employmentType = employmentType;
  isUpdated = true;
}
if (jobLocation && job.jobLocation !== jobLocation) {
  job.jobLocation = jobLocation;
  isUpdated = true;
}
if (jobSalary && job.jobSalary !== jobSalary) {
  job.jobSalary = jobSalary;
  isUpdated = true;
}
if (jobApplicationUrl && job.jobApplicationUrl !== jobApplicationUrl) {
  job.jobApplicationUrl = jobApplicationUrl;
  isUpdated = true;
}
if (jobStatus && job.jobStatus !== jobStatus) {
  job.jobStatus = jobStatus;
  isUpdated = true;
}

if (!isUpdated) {
  return res.status(400).json({
    success: false,
    message: "No changes detected. Nothing to update.",
  });
}

    await job.save()
     return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });

 } catch (error) {
    console.log("Error in update details of single job in job listing controller", error.message)
    console.log("Full error", error)
    res.status(500).json({
        success:true,
        message:"Something went wrong"
    })
 }
}

export const deleteDetailsOfSingleJob = async(req, res) => {


    try {
        const {jobId} = req.params

         const job = await JobListing.findByPk(jobId)

        if(!job){
        return res.status(404).json({
            success:false,
            message:"Job not found"
        })
    }

    await job.destroy()

    res.status(200).json({
        success:true,
        message:"Deleted successfully",
        data:job
    })
    } catch (error) {
        console.log("Error in delete job in job listing controller",error.message)
        console.log("Full error", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}