const express = require('express')
const route = express.Router()
const Project = require('../Modal/ProjectSchema');
const Podcast = require('../Modal/podcastSchema');


route.get('/', async (req, res)=>{
    try {
        const podcast = await Podcast.findById(req.query.id)
        res.status(200).json({ data: podcast });
    } catch (error) {
        res.send(error.message)
    }
})

route.post('/', async (req, res)=>{
    try {
        const { projectId, title, description } = req.body;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var Time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var time = date + ' ' + Time;
        

        const newpodcast = new Podcast({ projectId, title, description,time});

        const savePodcast = await newpodcast.save();

        // Push the new podcast ID into the tasks array
        const project = await Project.findByIdAndUpdate(
            projectId,
            { $push: { podcast: newpodcast._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Podcast Added sucessfully', data: savePodcast });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

route.put("/",async(req, res)=>{
    try {
        const { projectId, podcastId } = req.body;

        let data = await Podcast.findByIdAndDelete(podcastId)

        // removing from projects array
        const project = await Project.findById(projectId)
        console.log(project)
        let neewPodcast= project.podcast.filter((el)=>el!=podcastId)

        const newpodcast= await Project.findByIdAndUpdate(projectId, {"podcast":neewPodcast})

        // Save the updated document
        await project.save();

        res.status(201).json({ message: 'Podcast Deleted sucessfully', data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

route.patch("/",async(req, res)=>{
    try {
        const { podcastId, Data } = req.body;
        

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        let podcast = await Podcast.findByIdAndUpdate(podcastId,{...Data,time:dateTime})
        

        res.status(201).json({ message: 'Podcast updated sucessfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports= route