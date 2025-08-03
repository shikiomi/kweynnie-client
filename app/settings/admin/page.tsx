'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/layout/navbar';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
  const [originalData, setOriginalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  // New User state and handlers
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserError, setCreateUserError] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUserType = localStorage.getItem('userType');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserType(storedUserType || '');
      
      if (storedUserType !== 'admin') {
        router.push('/settings/user');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalData({ ...formData });
  };

  const handleSaveClick = () => {
    console.log('Saving admin data:', formData);
    setIsEditing(false);
    // Add API call to save admin data
  };

  const handleCancelClick = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Create User handlers
  const handleNewUserChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
    setCreateUserMsg('');
    setCreateUserError('');
  };

  const handleCreateUser = () => {
    setCreateUserMsg('');
    setCreateUserError('');
    if (
      !newUser.firstName.trim() ||
      !newUser.lastName.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim() ||
      !newUser.role.trim()
    ) {
      setCreateUserError('Please fill in all fields.');
      return;
    }
    setCreateUserMsg('User created successfully! (Local only)');
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    });
  };

  if (!isAuthenticated || userType !== 'admin') {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen hero-bg">
        <Navbar />
        <main className="flex-1" style={{ padding: '2rem', paddingTop: '120px' }}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'details'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } bg-white`}
                  >
                    My details
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'password'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } bg-white`}
                  >
                    Password
                  </button>
                  <button
                    onClick={() => setActiveTab('createUser')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'createUser'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } bg-white`}
                  >
                    Create New User
                  </button>
                  <button
                    onClick={() => setActiveTab('manageUsers')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'manageUsers'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } bg-white`}
                  >
                    Manage Users
                  </button>
                </nav>
              </div>
              <div className="p-8">
                {/* My Details Tab */}
                {activeTab === 'details' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={formData.firstName || ''}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={formData.lastName || ''}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        placeholder="Administrator role"
                        value={formData.role || ''}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="mt-8">
                      {!isEditing ? (
                        <button
                          onClick={handleEditClick}
                          className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex space-x-4">
                          <button
                            onClick={handleCancelClick}
                            className="bg-gray-500 text-white px-8 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveClick}
                            className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Password Tab */}
                {activeTab === 'password' && (
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mt-8">
                      <button className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium">
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
                {/* Create New User Tab */}
                {activeTab === 'createUser' && (
                  <div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={newUser.firstName}
                          onChange={e => handleNewUserChange('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={newUser.lastName}
                          onChange={e => handleNewUserChange('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={newUser.email}
                        onChange={e => handleNewUserChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={e => handleNewUserChange('password', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select
                        value={newUser.role}
                        onChange={e => handleNewUserChange('role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        required
                      >
                        <option value="">Select role</option>
                        <option value="user">Branch 1 Manager</option>
                        <option value="admin">Branch 2 Manager</option>
                        <option value="tj">Thristan Jade Dado Regis</option>
                      </select>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={handleCreateUser}
                        className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        disabled={
                          !newUser.firstName ||
                          !newUser.lastName ||
                          !newUser.email ||
                          !newUser.password ||
                          !newUser.role
                        }
                      >
                        Create
                      </button>
                    </div>
                    {createUserError && (
                      <div className="mt-4 text-center text-sm text-red-600">{createUserError}</div>
                    )}
                    {createUserMsg && (
                      <div className="mt-4 text-center text-sm text-green-600">{createUserMsg}</div>
                    )}
                  </div>
                )}
                {activeTab === 'manageUsers' && (
                  <div>
                    <p className="text-gray-500">Manage Users feature coming soon.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
