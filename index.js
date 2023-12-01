const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const ProjectRoute= require('./Routes/ProjectRoutes');
const PodcastRoute= require('./Routes/PodcastRoute');
const uplodeRoute=  require('./Routes/UplodeRoute');
const Project = require('./Modal/ProjectSchema');
const Podcast = require('./Modal/podcastSchema');

app.use(express.json())
app.use(cors())

app.use('/project', ProjectRoute)
app.use('/podcast', PodcastRoute)
app.use('/upload', uplodeRoute)

app.get('/', (req, res) => {
    res.send('Welcome to API')
})

app.post('/singleProject', async (req, res) => {
    try {
        const { projectId } = req.body;
    
        const project = await Project.findById(projectId);
    
        const podcasts= await Podcast.find({projectId:projectId});
    
        res.status(201).json({ success: true, data:{...project._doc,podcast:podcasts} });
    
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})




app.listen(8080,()=>{
    console.log('server listening on port 8080');

    mongoose.connect('mongodb+srv://karanjarwal999:KC2LEB3EytSjB99Y@cluster0.r8aqhrg.mongodb.net/')
    .then((res)=>console.log('mongoose connected'))
    .catch((err)=>console.log(err.message));
})