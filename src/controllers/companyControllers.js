import CompanyName from "../models/companyModel.js"

export const createNewCompany = async(req, res) => {
    const {companyName,companyDescription,companyWebsite, companyLocation, companyEmail } = req.body

    if(!companyName || !companyWebsite || !companyLocation || !companyEmail){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    try {
        const company = await CompanyName.create({
            companyName,
            companyDescription,
            companyWebsite,
            companyLocation,
            companyEmail
        })


        res.status(201).json({
            success:true,
            message:"New company details added",
            data:company
        })
    } catch (error) {
        console.log("Error in create new company in company controllers", error.message)
        console.log("Full error", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
 }


export const getAllCompany = async(req, res) => {
    try {
        const companies = await CompanyName.findAll()

        if(companies.length ===0){
            return res.status(200).json({
                success:true,
                message:"No companies found",
                data:companies
            })
        }

        res.status(200).json({
            success:true,
            message:"List of companies",
            data:companies,
        })
    } catch (error) {
        console.log("Error in get all company in company controllers", error.message)
        console.log("Full error:" ,error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


export const getSingleCompany = async(req, res) => {
    try {
        const {companyId} = req.params

        const company = await CompanyName.findOne({where:{id:companyId}})

        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company does not exist or you are not authorized"
            })
        }

        res.status(200).json({
            success:true,
            message:"Details of company",
            data:company
        })

    } catch (error) {
        console.log("Error in get single company in company controller", error.message)
        console.log("Full error:", error)

        
        res.status(500).json({
            success:true,
            message:"Something went wrong",
            
        })
    }

    
}

export const updateCompanyDetails = async (req, res) => {
    try {
        const { companyId } = req.params;

        let company;
        try {
            company = await CompanyName.findOne({ where: { id: companyId } });
        } catch (dbErr) {
            return res.status(500).json({
                success: false,
                message: "Database error while finding company",
                error: dbErr.message
            });
        }

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        const allowedFields = [
            'companyName',
            'companyDescription',
            'companyWebsite',
            'companyLocation',
            'companyEmail'
        ];

        const updateData = {};
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update"
            });
        }

        try {
            await company.update(updateData);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.errors.map(e => e.message)
                });
            }
            return res.status(500).json({
                success: false,
                message: "Database error while updating company",
                error: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company details updated successfully",
            data: company
        });

    } catch (error) {
        console.error("Unexpected error in updateCompanyDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Unexpected server error",
            error: error.message
        });
    }
};




export const deleteCompanyDetails = async(req, res) => {
   try {
    const {companyId} = req.params
    
    const company = await CompanyName.findOne({where:{id:companyId}})

    if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }


        await company.destroy();

        res.status(200).json({
            success:true,
            message:"Deleted successfully",
            data:company
        })
   } catch (error) {
        console.log("Error in delete company details in company controller", error.message)
        console.log("Full error: ", error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
   }
}