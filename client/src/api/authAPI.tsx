import type { UserLogin } from '../interfaces/UserLogin';

// Login user function
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials.');
    }

    return data;
  } catch (error) {
    console.log('Error during login: ', error);
    return Promise.reject('Failed to log in.');
  }
};

// Retrieve users function
const retrieveUsers = async () => {
  try {
    const response = await fetch('/auth/register', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

export { login, retrieveUsers };