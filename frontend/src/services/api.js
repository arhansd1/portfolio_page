import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const sendChatMessage = async (messages) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, {
      messages
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};