const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const Project = require('../Modal/ProjectSchema');


// Define a route for uploading an image
router.post('/', async (req, res) => {
  try {
    
    const project = await Project.findByIdAndUpdate(req.body.id,{"image":req.body.image})
    
    // Return success response with the image URL
    return res.status(200).json({ data: project });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
