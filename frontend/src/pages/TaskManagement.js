import React, { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const initialTasks = {
  todo: [
    {
      id: 1,
      title: 'Research market trends',
      description: 'Analyze current market trends for Q3 report',
      priority: 'high',
      dueDate: '2023-12-20',
      assignee: 'John Doe',
      tags: ['research', 'marketing']
    },
    {
      id: 2,
      title: 'Update documentation',
      description: 'Update API documentation with new endpoints',
      priority: 'medium',
      dueDate: '2023-12-25',
      assignee: 'Jane Smith',
      tags: ['documentation', 'technical']
    }
  ],
  inProgress: [
    {
      id: 3,
      title: 'Design new landing page',
      description: 'Create mockups for the new product landing page',
      priority: 'high',
      dueDate: '2023-12-15',
      assignee: 'Mike Johnson',
      tags: ['design', 'website']
    }
  ],
  review: [
    {
      id: 4,
      title: 'Code review',
      description: 'Review pull requests for the new feature',
      priority: 'medium',
      dueDate: '2023-12-18',
      assignee: 'Sarah Wilson',
      tags: ['development', 'review']
    }
  ],
  done: [
    {
      id: 5,
      title: 'Setup development environment',
      description: 'Configure new development environment for team',
      priority: 'high',
      dueDate: '2023-12-10',
      assignee: 'Tom Brown',
      tags: ['setup', 'development']
    }
  ]
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (e, task, status) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceStatus: status }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const { task, sourceStatus } = JSON.parse(e.dataTransfer.getData('task'));
    
    if (sourceStatus !== targetStatus) {
      setTasks(prev => ({
        ...prev,
        [sourceStatus]: prev[sourceStatus].filter(t => t.id !== task.id),
        [targetStatus]: [...prev[targetStatus], task]
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="mt-2 text-gray-600">
            Organize and track your projects and tasks
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentTask(null);
            setIsModalOpen(true);
          }}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(tasks).map(([status, taskList]) => (
          <div
            key={status}
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {status.replace(/([A-Z])/g, ' $1').trim()} ({taskList.length})
            </h2>
            
            <div className="space-y-4">
              {taskList.map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow p-4 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, status)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-gray-900 font-medium">{task.title}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center">
                      <UserCircleIcon className="h-4 w-4 mr-1" />
                      {task.assignee}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" className="input-field mt-1" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="input-field mt-1" rows="3"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input type="date" className="input-field mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select className="input-field mt-1">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <input type="text" className="input-field mt-1" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input type="text" className="input-field mt-1" placeholder="Separate tags with commas" />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {currentTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
