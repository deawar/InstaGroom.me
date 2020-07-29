const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();

const { REVERSE_GEOCODE_URI } = process.env;
const { GOOGLE_API_KEY } = process.env;

// Route to get Address using latitude and longitude
router.get('/getAddress/:lat/:lng', async (req, res) => {
  //   const params = new SearchUrlParams({
  //     key: process.env.GOOGLE_API_KEY,
  //   });
  //   console.log(`${params}`);
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

module.exports = router;
