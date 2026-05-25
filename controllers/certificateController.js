import Certificate from "../models/Certificate.js";


// ADD CERTIFICATE
export const addCertificate = async (req, res) => {

  try {

    const {
      studentName,
      fatherName,
      enrollmentNumber,
      course,
      duration,
      grade,
      issueDate,
      serialNumber,
    } = req.body;

    // CHECK EXIST
    const alreadyExist = await Certificate.findOne({
      enrollmentNumber,
    });

    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: "Enrollment number already exists",
      });
    }

    const certificate = await Certificate.create({
      studentName,
      fatherName,
      enrollmentNumber,
      course,
      duration,
      grade,
      issueDate,
      serialNumber,
    });

    res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      data: certificate,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// VERIFY CERTIFICATE
export const verifyCertificate = async (req, res) => {

  try {

    const { enrollment } = req.params;

    const certificate = await Certificate.findOne({
      enrollmentNumber: enrollment,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};