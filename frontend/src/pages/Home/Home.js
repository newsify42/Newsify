import React from "react";

const Home = () => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("geolocation not supported by this browser");
    }
  }
  function showPosition(position) {
    console.log(
      "lat: ",
      position.coords.latitude,
      "lon: ",
      position.coords.longitude,
      "alt: ",
      position.coords.altitude
    );
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location info is unavailable");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occured.");
        break;
    }
  }
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={getLocation}>get location</button>
    </>
  );
};

export default Home;
