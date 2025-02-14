const pool = require("../config/db");

module.exports = {
  async subscribe(email) {
    const result = await pool.query(
      "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET subscribed = TRUE RETURNING *",
      [email]
    );
    return result.rows[0]; // Add any specific data handling here
  },

  async unsubscribe(email) {
    const result = await pool.query(
      "UPDATE newsletter_subscribers SET subscribed = FALSE WHERE email = $1 RETURNING *",
      [email]
    );
    return result.rows[0];
  },

  async getSubscribers() {
    const result = await pool.query(
      "SELECT email FROM newsletter_subscribers WHERE subscribed = TRUE"
    );
    return result.rows;
  },
};
