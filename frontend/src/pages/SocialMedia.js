import React, { useState } from 'react';
import {
  CalendarIcon,
  PhotoIcon,
  LinkIcon,
  HashtagIcon,
  ClockIcon,
  ShareIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const platforms = [
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-400' },
  { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-700' }
];

const scheduledPosts = [
  {
    id: 1,
    content: 'Excited to announce our latest feature release! #ProductUpdate #Innovation',
    platforms: ['twitter', 'linkedin'],
    scheduledFor: '2023-12-20T10:00',
    image: 'https://picsum.photos/400/300',
    status: 'scheduled'
  },
  {
    id: 2,
    content: 'Check out our new blog post about productivity tips!',
    platforms: ['facebook', 'linkedin'],
    scheduledFor: '2023-12-21T14:30',
    status: 'draft'
  }
];

const SocialMedia = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [image, setImage] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [posts, setPosts] = useState(scheduledPosts);

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSchedulePost = () => {
    const newPost = {
      id: posts.length + 1,
      content: postContent,
      platforms: selectedPlatforms,
      scheduledFor: scheduledTime,
      image: image,
      status: scheduledTime ? 'scheduled' : 'draft'
    };
    setPosts([...posts, newPost]);
    resetForm();
  };

  const resetForm = () => {
    setPostContent('');
    setSelectedPlatforms([]);
    setScheduledTime('');
    setImage(null);
    setShowScheduler(false);
  };

  const formatScheduledTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Media Manager</h1>
        <p className="mt-2 text-gray-600">
          Create, schedule, and manage your social media posts
        </p>
      </div>

      {/* Post Creator */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Platforms
          </label>
          <div className="flex space-x-4">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformToggle(platform.id)}
                className={`flex items-center px-4 py-2 rounded-full border ${
                  selectedPlatforms.includes(platform.id)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <i className={`${platform.icon} ${platform.color} text-lg mr-2`}></i>
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <textarea
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="What would you like to share?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <label className="cursor-pointer flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <PhotoIcon className="h-5 w-5 mr-2 text-gray-500" />
              Add Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <HashtagIcon className="h-5 w-5 mr-2 text-gray-500" />
              Add Hashtags
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <LinkIcon className="h-5 w-5 mr-2 text-gray-500" />
              Add Link
            </button>
          </div>

          <div className="flex space-x-4">
            {!showScheduler && (
              <button
                onClick={() => setShowScheduler(true)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
                Schedule
              </button>
            )}
            {showScheduler && (
              <input
                type="datetime-local"
                className="input-field"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            )}
            <button
              onClick={handleSchedulePost}
              disabled={!postContent || selectedPlatforms.length === 0}
              className="btn-primary"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              {scheduledTime ? 'Schedule Post' : 'Post Now'}
            </button>
          </div>
        </div>

        {image && (
          <div className="relative inline-block">
            <img
              src={image}
              alt="Preview"
              className="max-w-md rounded-lg"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Scheduled Posts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-2">
                  {post.platforms.map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId);
                    return (
                      <i
                        key={platformId}
                        className={`${platform.icon} ${platform.color} text-xl`}
                      ></i>
                    );
                  })}
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-lg mb-4 max-w-sm"
                />
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {formatScheduledTime(post.scheduledFor)}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.status === 'scheduled'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
