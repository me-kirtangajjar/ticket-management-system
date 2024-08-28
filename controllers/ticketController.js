const Ticket = require("../models/ticketModel");

const createTicket = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      venue,
      status,
      price,
      priority,
      dueDate,
    } = req.body;

    // Check if dueDate is in the future
    const now = new Date();
    const dueDateTime = new Date(dueDate);

    if (dueDateTime <= now) {
      return res.status(400).json({ msg: "Due date must be in the future." });
    }

    const createdBy = req.currentUserInfo.id;
    const ticket = await Ticket.createTicket({
      title,
      description,
      type,
      venue,
      status,
      price,
      priority,
      dueDate,
      createdBy,
    });
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

const assignUserToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { userId } = req.body;
    const ticket = await Ticket.assignUserToTicket(ticketId, userId);
    return res.status(200).json({
      msg: "User assigned successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

const getTicketDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.getTicketById(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong !!!" });
  }
};

module.exports = { createTicket, assignUserToTicket, getTicketDetails };