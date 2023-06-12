import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context';

/**
 * Custom hook for handling API service requests
 */
const useApiService = () => {
  const { user } = useContext(UserContext);

  // Base URL for the API
  const baseURL = process.env.REACT_APP_NEWS_AGGREGATOR_API_BASE_URL || '';

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];

  /**
   * Sends a GET request to the specified URL
   * @param {string} url - The URL to send the request to
   * @param {Object} params - Request parameters
   * @param {Object} config - Additional configuration options
   * @returns {Promise} - The response data from the API
   */
  const get = async (url, params = {}, config = {}) => {
    return request('get', url, { params, ...config });
  };

  /**
   * Sends a POST request to the specified URL
   * @param {string} url - The URL to send the request to
   * @param {Object} data - Request payload
   * @param {Object} config - Additional configuration options
   * @returns {Promise} - The response data from the API
   */
  const post = async (url, data = {}, config = {}) => {
    return request('post', url, { data, ...config });
  };

  /**
   * Sends a PUT request to the specified URL
   * @param {string} url - The URL to send the request to
   * @param {Object} data - Request payload
   * @param {Object} config - Additional configuration options
   * @returns {Promise} - The response data from the API
   */
  const put = async (url, data = {}, config = {}) => {
    return request('put', url, { data, ...config });
  };

  /**
   * Sends a PATCH request to the specified URL
   * @param {string} url - The URL to send the request to
   * @param {Object} data - Request payload
   * @param {Object} config - Additional configuration options
   * @returns {Promise} - The response data from the API
   */
  const patch = async (url, data = {}, config = {}) => {
    return request('patch', url, { data, ...config });
  };

  /**
   * Sends a DELETE request to the specified URL
   * @param {string} url - The URL to send the request to
   * @param {Object} config - Additional configuration options
   * @returns {Promise} - The response data from the API
   */
  const remove = async (url, config = {}) => {
    return request('delete', url, config);
  };

  /**
   * Sends a request to the API with the specified method, URL, and request data
   * @param {string} method - The HTTP method to use
   * @param {string} url - The URL to send the request to
   * @param {Object} requestData - Additional request data
   * @returns {Promise} - The response data from the API
   */
  const request = async (method, url, requestData = {}) => {
    try {
      const headers = getHeadersForRoute(url);
      const response = await axios.request({
        method,
        url: `${baseURL}${url}`,
        headers,
        ...requestData,
      });
      return response.data;
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  };

  /**
   * Returns the headers for the specified route
   * @param {string} url - The URL of the route
   * @returns {Object} - The headers object
   */
  const getHeadersForRoute = (url) => {
    const isPublicRoute = publicRoutes.some((route) => url.startsWith(route));
    if (isPublicRoute) {
      return {};
    } else {
      return { Authorization: `${user.token}` };
    }
  };

  /**
   * Extracts the error message from the error response
   * @param {Object} error - The error object
   * @returns {string} - The error message
   */
  const extractErrorMessage = (error) => {
    return error.response?.data?.message || 'An error occurred';
  };

  // Expose the API service methods
  return {
    get,
    post,
    put,
    patch,
    remove,
  };
};

export default useApiService;