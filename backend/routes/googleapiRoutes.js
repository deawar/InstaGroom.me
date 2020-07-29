const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const { GOOGLE_URI } = process.env;
const key = process.env.GOOGLE_API_KEY;

// Route to get Address using latitude and longitude
router.get('/getAddress', async (req, res) => {
  //   const params = new SearchUrlParams({
  //     key: process.env.GOOGLE_API_KEY,
  //   });
  //   console.log(`${params}`);
  try {
    const lat = '33.771309'; // This will be req.lat
    const lng = '-84.392929'; // This will be req.lng
    const latlng = `${lat},${lng}`;
    const { data } = await axios.get(`${GOOGLE_URI}latlng=${latlng}&key=${key}`);
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

module.exports = router;
