import Task from '../models/Task.model.js';
import Project from '../models/Project.model.js';

export const createTask = async (title, projectId, assignedToId) => {
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }
    
    // Create task
    const task = await Task.create({
        title,
        project: projectId,
        assignedTo: assignedToId
    });
    
    return task;
}

export const updateTaskStatus = async (taskId, status) => {
    const task = await Task.findById(taskId);
    
    if (!task) {
        throw new Error('Task not found');
    }
    
    task.status = status;
    await task.save();
    return task;
}

export const deleteTask = async (taskId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    await task.deleteOne();
    return true;
}

export const assignTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    
    task.assignedTo = userId;
    await task.save();
    return task.populate('assignedTo');
}

export const getTasksByProject = async (projectId) => {
    return await Task.find({ project: projectId }).populate('assignedTo');
}

export const getTasksByUser = async (userId) => {
    return await Task.find({ assignedTo: userId }).populate('project');
}
