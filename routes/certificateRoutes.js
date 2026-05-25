import express from "express";

import Certificate from "../models/Certificate.js";

const router = express.Router();


// ADD CERTIFICATE
router.post("/", async (req, res) => {

  try {

    const certificate = await Certificate.create(
      req.body
    );

    res.status(201).json({
      success: true,
      data: certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// VERIFY CERTIFICATE
router.get("/:enrollment", async (req, res) => {

  try {

    const certificate =
      await Certificate.findOne({
        enrollmentNumber:
          req.params.enrollment,
      });

    if (!certificate) {

      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });

    }

    res.json({
      success: true,
      data: certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

export default router;