const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const serviceContactRoutes = require("./routes/serviceContactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

const app = express();
app.use(express.json());

// ✅ Define CORS options properly
const corsOptions = {
  origin: ['http://localhost:3000', 'https://marketingbirbal.com'], // Allow local and production frontend
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

// ✅ Use the defined corsOptions only once
app.use(cors(corsOptions));

app.use("/api", contactRoutes);
app.use("/api", serviceContactRoutes);
app.use("/api", newsletterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
