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
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
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
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          !isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                      <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </label>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      }`}
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
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        !isEditing ? 'bg-gray-50' : 'bg-white'
                      }`}
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
              
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-500">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}