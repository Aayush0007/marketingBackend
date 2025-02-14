const pool = require('../config/db');

module.exports = {
  async addMessage(name, email, message) {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  },
};