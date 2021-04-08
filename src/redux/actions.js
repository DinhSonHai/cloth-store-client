import axios from 'axios';

export const register = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/auth/signup', formData, config);
    alert(res.data.message);
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach(error => console.log(error));
  }
}
