import axios from "axios";
import { accesstoken, kot_access_token } from "../../utils/constants";
import { serverUrl } from "../../utils/helper";

export const accessTokenFunctio = ()=>{
  return localStorage.getItem(accesstoken);
}
const accessTokenKOTFunctio = ()=>{
  return localStorage.getItem(kot_access_token);
}
const accessTokenWaiterFunctio = ()=>{
  return localStorage.getItem('waiter_access_token');
}
export const getRequest = async (props) => {
  const { endPoint } = props;

  try {
    const res = await axios.get(`${serverUrl}${endPoint}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenFunctio(),
      },
    });

    return res;
  } catch (error) {
     throw new Error(error?.response?.data?.msg);
  }
};
export const getWaiterRequest = async (props) => {
  const { endPoint } = props;

  try {
    const res = await axios.get(`${serverUrl}${endPoint}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenWaiterFunctio(),
      },
    });

    return res;
  } catch (error) {
     throw new Error(error?.response?.data?.msg);
  }
};
export const postRequest = async (props) => {
  const { body, endPoint } = props;
  try {
    const res = await axios.post(`${serverUrl}${endPoint}`, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenFunctio(),
      },
    });

    return res;
  } catch (err) {
    
    throw new Error(err?.response?.data?.msg);
  }
};
export const postKotRequest = async (props) => {
  const { body, endPoint } = props;
  try {
    const res = await axios.post(`${serverUrl}${endPoint}`, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenKOTFunctio(),
      },
    });

    return res;
  } catch (error) {
    throw new Error(error?.response?.data?.msg);
  }
};

export const postWaiterRequest = async (props) => {
  const { body, endPoint } = props;
  try {
    const res = await axios.post(`${serverUrl}${endPoint}`, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenWaiterFunctio(),
      },
    });

    return res;
  } catch (error) {
    throw new Error(error?.response?.data?.msg);
  }
};


export const putRequest = async (props) => {
  const { body, endPoint } = props;
  try {
    const res = await axios.put(`${serverUrl}${endPoint}`, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenFunctio(),
      },
    });

    return res;
  } catch (error) {
     throw new Error(error?.response?.data?.msg);
  }
};

export const deleteRequest = async (props) => {
  const { endPoint } = props;
  try {
    const res = await axios.delete(`${serverUrl}${endPoint}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessTokenFunctio(),
      },
    });

    return res;
  } catch (error) {
     throw new Error(error?.response?.data?.msg);
  }
};
