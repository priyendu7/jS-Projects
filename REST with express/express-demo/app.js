const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'},
]

app.get('/',(req, res) => {
    res.send('Hello world');
});
app.get('/api/courses', (req,res) =>{
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    // i = parseInt(req.params.id);
    // res.send(courses.i);
    const course = courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
        res.status(404).send('course with given id was not found');
        return;
    }
    res.send(course);

});


// app.get('/api/courses/:year/:month', (req ,res)=>{
//     res.send(req.params);
// });
app.get('/api/courses/:year/:month',(req,res) =>{
    res.send(req.query);
});


app.post('/api/courses',(req,res) =>{
    if (req.body.name.length<3 ||!req.body.name){
        res.status(400).send('name is null or less than 3 letters');
        return;
    }
    const course = {
        id : courses.length+1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);

});

app.put('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('course with given id was not found');
        return;
    }

    if (req.body.name.length<3 ||!req.body.name){
        res.status(400).send('name is null or less than 3 letters');
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('course with given id was not found');
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
});

const port = process.env.abra || 3000;
app.listen(port , () => {console.log(`Listenind to port ${port}...`)});
