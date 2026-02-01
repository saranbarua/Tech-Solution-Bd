const fetchData = async (url, config = {}) => {
  try {
    const response = await fetch(url, config);

    // Check if the response is not okay (status code not in the 2xx range)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Provide more informative error handling and messages
    if (error.name === "TypeError") {
      throw new Error("Network error or invalid URL");
    }

    // Re-throw any other custom errors
    throw error;
  }
};

export default fetchData;
