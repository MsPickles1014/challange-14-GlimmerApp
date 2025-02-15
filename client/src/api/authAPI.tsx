import type { UserLogin } from '../interfaces/UserLogin';

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
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

// 🚩 ADD this function for registering users
const registerUser = async (userData: UserLogin) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Registration failed, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user registration: ', err);
    return Promise.reject('Could not register user');
  }
};

// 🚩 Export both functions
export { login, registerUser };



// import type { UserLogin } from '../interfaces/UserLogin';

// const login = async (userInfo: UserLogin) => {
//   try {
//     const response = await fetch('/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userInfo),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error('User information not retrieved, check network tab!');
//     }

//     return data;
//   } catch (err) {
//     console.log('Error from user login: ', err);
//     return Promise.reject('Could not fetch user info');
//   }
// };

// export { login };
