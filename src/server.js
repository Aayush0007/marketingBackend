const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const serviceContactRoutes = require("./routes/serviceContactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ["https://marketingbirbal.com", "http://localhost:3000"], 
  methods: "POST",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/api", contactRoutes);
app.use("/api", serviceContactRoutes);
app.use("/api", newsletterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
