import Task from "../models/tasks.model.js";

const addTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Validate required fields
    if (!title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    if (!description.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    const newTask = new Task({
      title,
      description,
      createdBy: userId, // Automatically getting userId from middleware
    });

    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating task", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { taskId } = req.params; // Get taskId from URL params

    // Find the task and ensure it belongs to the authenticated user
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }

    // Update and return the modified task
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      { title, description },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating task", error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task and ensure the user owns it
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting task", error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.body; // Extracted from middleware

    // Find all tasks for the logged-in user
    const tasks = await Task.find({ createdBy: userId });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No tasks found",
        tasks: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body; // Extracted from middleware

    // Find task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOne({ _id: taskId, createdBy: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving task",
      error: error.message,
    });
  }
};

export { addTask, updateTask, deleteTask, getAllTasks, getTaskById };
