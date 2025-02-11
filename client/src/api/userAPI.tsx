// Function to login user
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Login successful:', data);

    // Save the token in localStorage (or cookies if you prefer)
    localStorage.setItem('authToken', data.token);

    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // This allows error handling in the Login component
  }
};

// Function to retrieve users
export const retrieveUsers = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/users', {
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
