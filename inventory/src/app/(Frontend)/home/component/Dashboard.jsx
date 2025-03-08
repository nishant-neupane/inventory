"use client";
import { useEffect, useState } from "react";

const Hero = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const connectToMongoDB = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/connect");
        console.log("Response Status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Response Data:", data);
          setStatus(data.message || "Error occurred");
        } else {
          const errorData = await response.text();
          console.error("Error response:", errorData);
          setStatus("Failed to connect to MongoDB");
        }
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        setStatus("Failed to connect to MongoDB");
      }
    };

    connectToMongoDB();
  }, []);

  return (
    <div>
      <h1>MongoDB Connection Status</h1>
      <p>{status ? status : "Connecting to MongoDB..."}</p>
    </div>
  );
};

export default Hero;
