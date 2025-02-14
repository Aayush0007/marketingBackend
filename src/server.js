const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const serviceContactRoutes = require("./routes/serviceContactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

const app = express();
app.use(express.json());

// ✅ Corrected CORS settings
const corsOptions = {
  origin: ['http://localhost:3000', 'https://marketingbirbal.com'], // Allowed frontend origins
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // ✅ Add OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'], // ✅ Explicitly allow headers
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Manually handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Welcome to the DZI Daemon Server!');
});


app.use("/api", contactRoutes);
app.use("/api", serviceContactRoutes);
app.use("/api", newsletterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
