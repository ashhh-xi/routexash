"use client";
import { useState } from "react";
import { getElevationPoint, getElevationLine } from "../utils/api";

const ElevationDisplay = () => {
  const [pointElevation, setPointElevation] = useState(null);
  const [lineElevation, setLineElevation] = useState(null);

  const fetchPointElevation = async () => {
    const data = await getElevationPoint(38.11295, 13.349762);
    setPointElevation(data);
  };

  const fetchLineElevation = async () => {
    const coordinates = [
      [13.3313, 38.10843],
    ];
    const data = await getElevationLine(coordinates);
    setLineElevation(data);
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchPointElevation}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Get Point Elevation
      </button>
      {pointElevation && (
        <div className="mb-4">
          <h3 className="text-lg font-bold">Point Elevation:</h3>
          <pre className="bg-gray-100 p-2 rounded text-black">
            {JSON.stringify(pointElevation, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={fetchLineElevation}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        Get Line Elevation
      </button>
      {lineElevation && (
        <div>
          <h3 className="text-lg font-bold">Line Elevation:</h3>
          <pre className="bg-gray-100 p-2 rounded text-black">
            {JSON.stringify(lineElevation, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ElevationDisplay;
