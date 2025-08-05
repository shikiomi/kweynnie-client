'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/layout/navbar';
import ConfirmationModal from '../../components/ui/confirmation-modal';

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

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Save details state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

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
    setSaveError('');
    setSaveSuccess('');
    
    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setSaveError('Please fill in all required fields.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSaveError('Please enter a valid email address.');
      return;
    }
    
    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    setIsSavingDetails(true);
    
    try {
      //Replace with actual API call when backend is ready
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || 'placeholder-token'}`
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          role: formData.role.trim()
        })
      });

      if (response.ok) {
        setSaveSuccess('Profile updated successfully!');
        setOriginalData({ ...formData });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setSaveError(errorData.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      //Placed success bc no backend yet
      console.log('Admin profile update attempt:', formData);
      setSaveSuccess('Profile updated successfully! (Demo only)');
      setOriginalData({ ...formData });
      setIsEditing(false);
    } finally {
      setIsSavingDetails(false);
      setShowSaveModal(false);
    }
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

  // Create User event handlers
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setNewUser(prev => ({ ...prev, [name]: value }));
  setCreateUserMsg('');
  setCreateUserError('');
};

 const handleCreateUser = async () => {
  setCreateUserMsg('');
  setCreateUserError('');
  if (
    !newUser.firstName.trim() ||
    !newUser.lastName.trim() ||
    !newUser.email.trim() ||
    !newUser.password.trim() ||    // Still validated, but not sent to backend in sample code
    !newUser.role.trim()
  ) {
    setCreateUserError('Please fill in all fields.');
    return;
  }
  try {
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Full_Name: newUser.firstName + ' ' + newUser.lastName,
        Email: newUser.email,
        Role: newUser.role,
        Branch_ID: 1 // Change if you want to select branch!
      }),
    });
    if (!response.ok) throw new Error('Failed to create user');
    setCreateUserMsg('User created successfully!');
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    });
    // Optionally: refresh users list here if needed
  } catch (e) {
    setCreateUserError('Error creating user');
  }
};
  // Password change event handlers
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordUpdateClick = () => {
    setPasswordError('');
    setPasswordSuccess('');
    
    // Pass validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    
    setShowPasswordModal(true);
  };

  const handleConfirmPasswordUpdate = async () => {
    setIsUpdatingPassword(true);
    
    try {
      // TODO: Replace with actual API call when backend is ready
      const response = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || 'placeholder-token'}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        setPasswordSuccess('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        const errorData = await response.json();
        setPasswordError(errorData.message || 'Failed to update password. Please try again.');
      }
    } catch (error) {
      //Placed success bc no backend yet
      console.log('Admin password update attempt:', passwordData);
      setPasswordSuccess('Password updated successfully! (Demo only)');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } finally {
      setIsUpdatingPassword(false);
      setShowPasswordModal(false);
    }
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
      <Navbar />
      <main className="hero-bg min-h-screen" style={{marginLeft: '280px', padding: '2rem', paddingTop: '120px'}}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
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

                    {saveError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{saveError}</p>
                      </div>
                    )}

                    {saveSuccess && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-600">{saveSuccess}</p>
                      </div>
                    )}

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
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password (min. 8 characters)"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
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
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {passwordError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{passwordError}</p>
                      </div>
                    )}

                    {passwordSuccess && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm text-green-600">{passwordSuccess}</p>
                      </div>
                    )}

                    <div className="mt-8">
                      <button 
                        onClick={handlePasswordUpdateClick}
                        className="bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                      >
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
          name="firstName"
          placeholder="First name"
          value={newUser.firstName}
          onChange={handleNewUserChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
        <input
          type="text"
          name="lastName"   // <-- fixed capitalization!
          placeholder="Last name"
          value={newUser.lastName}
          onChange={handleNewUserChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          required
        />
      </div>
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={newUser.email}
        onChange={handleNewUserChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        required
      />
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={newUser.password}
        onChange={handleNewUserChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        required
      />
    </div>
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={newUser.role}
        onChange={handleNewUserChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        required
      />
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

      <ConfirmationModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handleConfirmPasswordUpdate}
        title="Confirm Password Update"
        message="Are you sure you want to update your password? This action cannot be undone and you may need to sign in again."
        confirmText="Yes, Update Password"
        cancelText="Cancel"
        type="warning"
        isLoading={isUpdatingPassword}
      />

      <ConfirmationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleConfirmSave}
        title="Save Profile Changes"
        message="Are you sure you want to save these changes to your profile? Your information will be updated in the system."
        confirmText="Yes, Save Changes"
        cancelText="Cancel"
        type="info"
        isLoading={isSavingDetails}
      />
    </>
  );
}
