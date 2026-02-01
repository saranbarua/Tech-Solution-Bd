import axios from "axios";

const putDataImg = async (url, data, headers = {}, config = null) => {
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers, // Merge any additional headers you want to pass
    },
    ...config, // Merge any additional config options
  });

  return response.data;
};

export default putDataImg;
