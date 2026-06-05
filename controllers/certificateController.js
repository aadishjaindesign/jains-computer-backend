import Certificate from "../models/Certificate.js";


// ADD CERTIFICATE
export const addCertificate = async (req, res) => {

  try {

    const {
      studentName,
      enrollmentNumber,
      course,
      courseIssueDate,
      duration,
      internship,
      internshipDuration,
      issueDate,
    } = req.body;

    // CHECK EXIST
    const alreadyExist =
      await Certificate.findOne({
        enrollmentNumber,
      });

    if (alreadyExist) {

      return res.status(400).json({
        success: false,
        message:
          "Enrollment number already exists",
      });
    }

    const certificate =
      await Certificate.create({

        studentName,

        enrollmentNumber,

        course,

        courseIssueDate,

        duration,

        internship,

        internshipDuration,

        issueDate,

      });

    res.status(201).json({

      success: true,

      message:
        "Certificate added successfully",

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


// GET ALL CERTIFICATES
export const getCertificates =
  async (req, res) => {

    try {

      const certificates =
        await Certificate.find()
          .sort({ createdAt: -1 });

      res.status(200).json({

        success: true,

        data: certificates,

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
export const verifyCertificate =
  async (req, res) => {

    try {

      // year aur number alag params — RJ/25/6582 banta hai
      const { year, number } = req.params;
      const fullYear = year.length === 2 ? `20${year}` : year;
      const enrollment = `RJ/${fullYear}/${number}`;

      const certificate =
        await Certificate.findOne({

          enrollmentNumber: {
            $regex: enrollment,
            $options: "i",
          },

        });

      if (!certificate) {

        return res.status(404).json({

          success: false,

          message:
            "Certificate not found",

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


// UPDATE CERTIFICATE
export const updateCertificate =
  async (req, res) => {

    try {

      const updatedCertificate =
        await Certificate.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.status(200).json({

        success: true,

        message:
          "Certificate updated successfully",

        data: updatedCertificate,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });

    }
  };


// DELETE CERTIFICATE
export const deleteCertificate =
  async (req, res) => {

    try {

      await Certificate.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Certificate deleted",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });

    }
  };