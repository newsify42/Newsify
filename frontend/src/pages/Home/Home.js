import React from "react";

const Home = () => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("geolocation not supported by this browser");
    }
  }
  function showPosition(position) {
    console.log(
      "lat: ",
      position.coords.latitude,
      "lon: ",
      position.coords.longitude
    );
  }
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={getLocation}>get location</button>
    </>
  );
};

export default Home;
