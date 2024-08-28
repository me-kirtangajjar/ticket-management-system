const router = require("express").Router();
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../validators/validateUserRegistration");
const { validateRequest } = require("../middlewares/validateRequest");
const { register, login } = require("../controllers/userController");
const {
  createTicket,
  assignUserToTicket,
  getTicketDetails,
} = require("../controllers/ticketController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// User routes
router.post("/users", validateUserRegistration, validateRequest, register);
router.post("/auth/login", validateUserLogin, validateRequest, login);

// Ticket routes
router.post("/ticket", authMiddleware, createTicket);
router.post("/tickets/:ticketId/assign", authMiddleware, assignUserToTicket);
router.get("/tickets/:ticketId", authMiddleware, getTicketDetails);

module.exports = router;