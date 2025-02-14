  const pool = require('../config/db');

  exports.addServiceContact = async (name, email, message, subject) => {
    try {
      const result = await pool.query(
        'INSERT INTO service_contacts (name, email, message, subject) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, message, subject]
      );

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error("Database Error:", err);
      return null;
    }
  };
  