import client from "../network/axios-client";

export const getUsers = async () => {
  try {
    const response = await client.get(`sites/1/users.json?num=30`);
    if (response.status === 200) {
      return response;
    }
  } catch ({ response }) {
    return response;
  }
};

export const addUser = async user => {
  try {
    const response = await client.post(`sites/1/users.json`, user);
    if (response.status === 200) {
      return response;
    }
  } catch ({ response }) {
    return response;
  }
};

export const deleteUser = async userId => {
  try {
    const response = await client.delete(`sites/1/users/${userId.userid}.json`);
    if (response.status === 200) {
      return response;
    }
  } catch ({ response }) {
    return response;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await client.put(
      `sites/1/users/${userId}.json`,
      updatedData
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch ({ response }) {
    return response;
  }
};

export const handleAPIresponse = res => {
  switch (true) {
    case res.status === 200:
      return "Response 200 OK";
    case (res.status = 400):
      return "Response 400 Bad Request. Invalid syntax, missing required argument or invalid request.";
    case (res.status = 401):
      return "401 Unauthorized. Authorization failed";
    case (res.status = 404):
      return "404 Resource not found. The url is invalid";
    case res.status === 429:
      return "429 Too Many Requests";
    case res.status === 500:
      return "Response 500 500Internal Server Error";
    default:
      return "hej";
  }
};
