import axios from "axios";

const API_BASE_URL = "http://localhost:5500/api";

export const getElevationPoint = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/elevation/point`, {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching elevation point data:", error.message, error.response?.data);
    return null;
  }
};

export const getElevationLine = async (coordinates) => {
  // if (!coordinates || !Array.isArray(coordinates) || coordinates.some(coord => !Array.isArray(coord) || coord.length !== 2)) {
  //   console.error("Invalid coordinates format. Expected an array of [lng, lat] pairs.");
  //   return null;
  // }

  console.log("Coordinates for line elevation:", coordinates);

  try {
    const response = await axios.post(`${API_BASE_URL}/elevation/point`, {
      coordinates, // Pass the coordinates as an array
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching elevation line data:", error.message, error.response?.data);
    return null;
  }
};
