import { Task } from "../models/task.model.js";
import { catchAsync } from "../middlewares/error.middleware.js";
import { AppError } from "../middlewares/error.middleware.js";

// Create Task
export const createTask = catchAsync(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  const userId = req.id;

  const task = await Task.create({
    title,
    description,
    priority,
    status,
    dueDate,
    userId,
  });

  return res.status(201).json({ success: true, data: task });
});

// Get all tasks with filtering, search
export const getTasks = catchAsync(async (req, res) => {
  const userId = req.id;
  const { status, priority, search, page = 1, limit = 20 } = req.query;

  const filters = { userId };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  const query = Task.find(filters).sort({ createdAt: -1 });
  if (search) {
    query.find({ $text: { $search: search } });
  }

  const pageNumber = Number(page) || 1;
  const pageSize = Math.min(Number(limit) || 20, 100);
  const skip = (pageNumber - 1) * pageSize;

  const [items, total] = await Promise.all([
    query.skip(skip).limit(pageSize),
    Task.countDocuments(search ? { ...filters, $text: { $search: search } } : filters),
  ]);

  return res.json({ success: true, data: items, page: pageNumber, limit: pageSize, total });
});

// Get single task
export const getTaskById = catchAsync(async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, userId });
  if (!task) throw new AppError("Task not found", 404);
  return res.json({ success: true, data: task });
});

// Update task
export const updateTask = catchAsync(async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  const allowed = ["title", "description", "priority", "status", "dueDate"];
  const update = {};
  for (const key of allowed) {
    if (key in req.body) update[key] = req.body[key];
  }

  const task = await Task.findOneAndUpdate({ _id: id, userId }, update, {
    new: true,
    runValidators: true,
  });
  if (!task) throw new AppError("Task not found", 404);
  return res.json({ success: true, data: task });
});

// Delete task
export const deleteTask = catchAsync(async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) throw new AppError("Task not found", 404);
  return res.json({ success: true, message: "Task deleted" });
});

// Stats
export const getTaskStats = catchAsync(async (req, res) => {
  const userId = req.id;

  const [countsByStatus, countsByPriority, totalCount] = await Promise.all([
    Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Task.aggregate([
      { $match: { userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]),
    Task.countDocuments({ userId }),
  ]);

  const toMap = (arr, keys) => keys.reduce((acc, k) => ({ ...acc, [k]: 0 }), {});
  const statusKeys = ["Todo", "In Progress", "Completed"];
  const priorityKeys = ["Low", "Medium", "High"];
  const statusMap = toMap(countsByStatus, statusKeys);
  const priorityMap = toMap(countsByPriority, priorityKeys);

  for (const row of countsByStatus) statusMap[row._id] = row.count;
  for (const row of countsByPriority) priorityMap[row._id] = row.count;

  return res.json({
    success: true,
    data: {
      total: totalCount,
      completed: statusMap["Completed"],
      pending: statusMap["Todo"] + statusMap["In Progress"],
      byStatus: statusMap,
      byPriority: priorityMap,
    },
  });
});


