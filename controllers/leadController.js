import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
   let { name, phone, course, source, email, message } = req.body;

    // ✅ Validation
    if (!name || !phone || !course) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   name = name.trim();
course = course.trim();
source = source || "popup";

if (name.length < 2 || name.length > 50) {
  return res.status(400).json({
    success: false,
    message: "Name must be between 2 to 50 characters",
  });
}

phone = phone.replace(/\D/g, "");

if (phone.length !== 10) {
  return res.status(400).json({
    success: false,
    message: "Phone must be exactly 10 digits",
  });
}
const recentLead = await Lead.findOne({
  phone,
  createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
});

if (recentLead) {
  return res.status(400).json({
    success: false,
    message: "You already submitted recently",
  });
}

const existing = await Lead.findOne({ phone, course });

if (existing) {
  return res.status(400).json({
    success: false,
    message: "Lead already exists",
  });
}
if (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
}

    // ✅ Save to DB
   const lead = await Lead.create({
  name,
  phone,
  email,
  message,
  course,
  source,
});

    res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      data: lead,
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
  
};
// 🔥 GET ALL
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ data: leads });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
};

// 🔥 DELETE
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
};

// 🔥 UPDATE
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ data: updated });

  } catch (err) {
    res.status(500).json({ message: "Update error" });
  }
};