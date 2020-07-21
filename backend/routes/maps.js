const axios = require('axios');
// const express = require('express');
const router = require('express').Router();
// const path = require('path');

const {location} = props; // get this from ContextAPI
const destination = props.clientAddress(); // get this from ContextAPI

export default {
  getCurrentAddress() {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
  },
  getDirections() {
    return axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${destination}&destination=${clientAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
  },
  getTravelETA() {
    return axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${location}&destination=${clientAddress}&departure_time=${currentTime}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
  },
};

router.get('/api/map/:latlng', (req, res) => {
  console.log('maproute /');
//   res.sendFile(path.join(`${__dirname}./public/index.html`));
});

axios({
  method: 'GET',
  url: process.env.GOOGLE_MAPS_URL,
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': process.env.GOOGLE_MAPS_URL,
    'x-rapidapi-key': process.env.GOOGLE_MAPS_API_KEY,
    useQueryString: true,
  },
  params: {
    language: 'en',
    latlng: location,
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = maps;
