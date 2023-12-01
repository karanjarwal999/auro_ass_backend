const express = require('express')
const route = express.Router()
const Project = require('../Modal/ProjectSchema');


route.get('/', async (req, res)=>{
    try {
        const AllProjects = await Project.find({});
        res.status(201).json({ success: true, data: AllProjects });
    } catch (error) {
        res.send(error.message)
    }
})

route.post('/', async (req, res)=>{
    try {
        const { name } = req.body;
        const project = new Project({ name });

        const savedProject = await project.save();

        res.status(201).json({ message: 'Project Added sucessfully', data: savedProject });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})

module.exports= route