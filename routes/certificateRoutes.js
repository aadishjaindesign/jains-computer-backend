import express from "express";

import {
  addCertificate,
  verifyCertificate,
  getCertificates,
  deleteCertificate,
  updateCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();


// ADD CERTIFICATE
router.post("/", addCertificate);


// GET ALL CERTIFICATES
router.get("/", getCertificates);


// VERIFY CERTIFICATE
router.get("/:enrollment", verifyCertificate);


// UPDATE CERTIFICATE
router.put("/:id", updateCertificate);


// DELETE CERTIFICATE
router.delete("/:id", deleteCertificate);


export default router;