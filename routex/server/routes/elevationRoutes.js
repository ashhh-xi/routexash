const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const API_KEY = process.env.OPENROUTESERVICE_API_KEY;

router.get("/point", async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/elevation/point`,
      {
        params: {
          api_key: API_KEY,
          geometry: `${lng},${lat}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching elevation point data:", error.message);
    res.status(500).send("Failed to fetch elevation point data.");
  }
});

router.post("/point", async (req, res) => {
  const { coordinates } = req.body; // Expect [lng, lat]

  // if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
  //   return res.status(400).json({
  //     error: "Invalid coordinates. Provide [lng, lat].",
  //   });
  // }

  console.log("Received coordinates:", coordinates);

  try {
    // Log payload
    const payload = {
      format_in: "point",
      geometry: coordinates,
    };
    console.log("Payload to ORS API:", payload);

    const response = await axios.post(
      "https://api.openrouteservice.org/elevation/point",
      payload,
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ORS API Response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching elevation point data:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    const status = error.response?.status || 500;
    res.status(status).json({
      error: "Failed to fetch elevation point data.",
      details: error.response?.data || "No additional information.",
    });
  }
});

module.exports = router;
