import { apiConnector } from "../apiConnector";
import { authendpoints } from "../apis";

const { GET_USER_API } = authendpoints;

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const res = await apiConnector("GET", GET_USER_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (res.status === 200) {
      return res.data; // Assuming the user data is in res.data
    } else {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
  } catch (err) {
    console.error("GET USER API ERROR....", err);
    if (err.response && err.response.status === 401) {
      console.log("Unauthorized error: Possibly invalid or expired token");
    }
    throw err; // Propagate the error if needed for further handling
  }
};
