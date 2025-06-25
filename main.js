import express from 'express'
import mongoose from 'mongoose';
import { PorfoliolData } from './models/ProjectData.js';
import {ExpData} from './models/ExpData.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 8000

try {
    let connDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB:', connDB.connection.name);
} catch (error) {
    console.error('MongoDB connection error:', error);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const submissionStatus = req.query.status;
    let message = '';
    if (submissionStatus === 'success') {
        message = 'Data sent successfully!';
    }
    
    // Fetch all projects
    const projects = await PorfoliolData.find({}).sort({ _id: -1 });
    // Fetch all experiences
    const experiences = await ExpData.find({}).sort({ _id: -1 });

    // res.send(experiences);
    res.render('index', { 
        message: message,
        projects: projects,
        experiences: experiences
    });
});

app.post('/post' , async (req, res) => {
    try {
        // await PersonalData.deleteMany({}); 
        await PorfoliolData.create({
            title: req.body.title,
            ProjectDesc: req.body.ProjectDesc,
            Github: req.body.Github,
            LiveDemo: req.body.LiveDemo,
            techStack: JSON.parse(req.body.techStack)
        });
        console.log('Data saved:', req.body);
        // Redirect to the homepage with a success status in the query
        res.redirect('/?status=success');
    } catch (error) {
        console.error("Error saving data:", error);
        // Redirect with an error status or render an error page
        res.redirect('/?status=error'); // Example for error
    }
})
app.post('/experience', async (req, res) => {
    try {
        await ExpData.create({
            expTitle: req.body.expTitle,
            company: req.body.company,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            expDesc: req.body.expDesc
        });
        console.log('Experience data saved:', req.body);
        res.redirect('/?status=success');
    } catch (error) {
        console.error("Error saving experience data:", error);
        res.redirect('/?status=error');
    }
})


app.delete('/project/:id', async (req, res) => {
    try {
        await PorfoliolData.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.delete('/experience/:id', async (req, res) => {
    try {
        await ExpData.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})