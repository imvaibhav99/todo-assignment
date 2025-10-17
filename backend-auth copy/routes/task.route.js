import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { body, param, query } from "express-validator";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../controllers/task.controller.js";

const router = express.Router();

// Validators
const createUpdateValidators = validate([
  body("title").optional({ nullable: true }).isString().trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("description").optional().isString(),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  body("dueDate").optional().isISO8601().toDate().withMessage("Invalid due date"),
]);

const idValidator = validate([param("id").isMongoId().withMessage("Invalid task id")]);

const listValidators = validate([
  query("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status filter"),
  query("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority filter"),
  query("search").optional().isString(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
]);

// Routes (all protected)
router.use(isAuthenticated);

router.get("/", listValidators, getTasks);
router.get("/stats", getTaskStats);
router.get("/:id", idValidator, getTaskById);
router.post("/", validate([body("title").exists().trim().isLength({ min: 1 }).withMessage("Title is required")]), createTask);
router.put("/:id", idValidator, createUpdateValidators, updateTask);
router.delete("/:id", idValidator, deleteTask);

export default router;


