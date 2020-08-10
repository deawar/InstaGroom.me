const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const { REVERSE_GEOCODE_URI } = process.env;
const { GOOGLE_DIRECTION_URI } = process.env;
const { GOOGLE_API_KEY } = process.env;

// Route to get Address using latitude and longitude
router.get('/getAddress/:lat/:lng', async (req, res) => {
  try {
    const { lat } = req.params;
    const { lng } = req.params;
    const latlng = `${lat},${lng}`;
    const { data } = await axios.get(`${REVERSE_GEOCODE_URI}latlng=${latlng}&key=${GOOGLE_API_KEY}`);
    return res.json({
      error: false,
      data: data.results[0].formatted_address,
      message: 'Address found',
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: null,
      message: ' Unable to find address !! ',
    });
  }
});

// Route to get Direction from one place to another
router.get('/getDirection', async (req, res) => {
  try {
    const latitude = req.body.origin.userLat;
    const longitude = req.body.origin.userLng;
    const ulatitude = req.body.destination.clientLat;
    const ulongitude = req.body.destination.clientLng;

    const origin = `${latitude},${longitude}`;
    const destination = `${ulatitude},${ulongitude}`;
    // const address = req.body.clientAddress;
    // const split = address.split(' ');
    // const destination = split.slice(0, split.length).join('+');
    console.log(destination);
    const { data } = await
    axios.get(
      `${GOOGLE_DIRECTION_URI}origin=${origin}&destination=${destination}&departure_time=now&alternatives=true&key=${GOOGLE_API_KEY}`,
    );
    const mydirection = {
      distance: data.routes[0].legs[0].distance.text,
      duration: data.routes[0].legs[0].duration_in_traffic.text,
      myOrigin: data.routes[0].legs[0].start_address,
      myDestination: data.routes[0].legs[0].end_address,
      directionPoints: data.routes[0].overview_polyline.points,
    };
    return res.json({
      error: false,
      result: mydirection,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      data: err,
      message: ' Unable to create route !! ',
    });
  }
});
module.exports = router;
