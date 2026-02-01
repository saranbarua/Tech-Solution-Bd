import axios from "axios";

const postData = async (url, data, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "Request failed");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error(error.message);
    }
  }
};

export default postData;
