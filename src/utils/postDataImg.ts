import axios from "axios";

const postDataImg = async (url, data, headers = {}, config = null) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...headers, // Merge any additional headers you want to pass
    },
    ...config, // Merge any additional config options
  });

  return response.data;
};

export default postDataImg;
