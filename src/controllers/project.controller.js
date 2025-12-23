import Project from '../models/Project.model.js';
import User from '../models/User.model.js';

// Create project
export const createProject = async (name, userId) => {
  const project = await Project.create({
    name,
    owner: userId,
    members: [userId], // Add creator as a member by default?
  });
  
  // Add project validation to User document if needed, but not strictly required if we query by Project.owner
  
  return project;
};

// Get all projects of a user (owned or member)
// The user prompt said "Fetch all projects of a user"
export const getUserProjects = async (userId) => {
    // Find projects where user is owner OR user is in members
    // Assuming we want to show all projects the user has access to
    const projects = await Project.find({
        $or: [
            { owner: userId },
            { members: userId }
        ]
    }).populate('owner').populate('members');
    
    return projects;
};

export const updateProject = async (projectId, name, userId) => {
    const project = await Project.findById(projectId);
    
    if (!project) {
        throw new Error('Project not found');
    }
    
    if (project.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to update this project');
    }
    
    project.name = name || project.name;
    const updatedProject = await project.save();
    return updatedProject;
}

export const deleteProject = async (projectId, userId, userRole) => {
    const project = await Project.findById(projectId);
    
    if (!project) {
        throw new Error('Project not found');
    }
    
    // Only Admin or the Owner can delete?
    // Prompt says: Delete project (Admin only)
    if (userRole !== 'Admin') {
        throw new Error('Not authorized to delete projects. Admin only.');
    }
    
    await project.deleteOne();
    return true;
}

export const addMember = async (projectId, memberId, userId) => {
     const project = await Project.findById(projectId);
     
     if (!project) {
        throw new Error('Project not found');
    }
    
    if (project.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to add members');
    }
    
    // Check if member exists
    const userToAdd = await User.findById(memberId);
    if (!userToAdd) {
        throw new Error('User to add not found');
    }

    if (!project.members.includes(memberId)) {
        project.members.push(memberId);
        await project.save();
    }
    
    return project.populate('members');
}
