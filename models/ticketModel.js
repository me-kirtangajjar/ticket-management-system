const db = require('../config/db');

const Ticket = {
  async createTicket({ title, description, type, venue, status, price, priority, dueDate, createdBy }) {
    const result = await db.query(
      'INSERT INTO tickets (title, description, type, venue, status, price, priority, dueDate, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, type, venue, status, price, priority, dueDate, createdBy]
    );
    return result.rows[0];
  },

  async assignUserToTicket(ticketId, userId) {
    const result = await db.query(
      'INSERT INTO ticket_assignments (ticketId, userId) VALUES ($1, $2) RETURNING *',
      [ticketId, userId]
    );
    return result.rows[0];
  },

  async getTicketById(ticketId) {
    const result = await db.query('SELECT * FROM tickets WHERE id = $1', [ticketId]);
    return result.rows[0];
  },
};

module.exports = Ticket;