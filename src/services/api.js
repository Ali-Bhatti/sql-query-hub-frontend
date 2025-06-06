import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const executeQuery = async (connectionConfig, query) => {
    try {
        const response = await api.post('/api/query/execute-queries', {
            config: connectionConfig,
            query: query
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/api/query/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api; 