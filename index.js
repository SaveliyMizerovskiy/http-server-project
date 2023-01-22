/*Tools: code editor, browser, command line utility, 
application and server utility, API platform
*/
// Saveliy Mizerovskiy 01/22/23 pd 7-8 odd (i think)
/* All routes:
GET:
/api/home
/api/songs
/api/songs/:id
/api/songs/year/:year
/api/songs/month/:month

POST:
/api/songs

PUT:
/api/songs/:id

DELETE:
/api/songs/:id
*/

/*
short reflection as a JS comment in which you explain (1) how programs communicate in what order to each other for a given purpose, 
(2) what you learned in this project and (3) how can this project be further extended.

1: Programs communicate with each other by sending html requests
2: I learned how to set up a localhost server and make it be able to do simple commadns
3: This project can be extended by making it a normal server which everyone can access and not just local host
*/

const express = require('express');
const app = express();
app.use(express.json());
//  pop, hip hop, rap, classical, rock, jazz, blues, and electronic
const songs = [
    {id: 1, name:'Pop', year: 1950, month: 01},
    {id: 2, name:'Hip Hop', year: 1973, month: 08},
    {id: 3, name:'Rap', year: 1970, month: 01},
    {id: 4, name:'Classical', year: 1750, month: 01},
    {id: 5, name:'Rock', year: 1950, month: 01},
    {id: 6, name:'Jazz', year: 1980, month: 01},
    {id: 7, name:'Blues', year: 1890, month: 01},
    {id: 8, name:'Electronic', year: 1953, month: 01},
];
//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/api/home', (req,res)=>{
    res.send("Hello and welcome to my music app (made by Saveliy Mizerovskiy)");
});

app.get('/api/songs', (req,res)=>{
    res.send(songs);
});

app.get('/api/songs/:id',(req,res)=>{
    const song = songs.find(c=> c.id === parseInt(req.params.id));
    if (!song){
        res.status(404).send("The genre with the given ID was not found");
        return
    }

    res.send(song);
})

app.get('/api/songs/year/:year',(req,res)=>{
    const song = songs.find(c=> c.year === parseInt(req.params.year));
    if (!song){
        res.status(404).send("The genre with the given year was not found");
        return
    } else {
        songs.forEach(songl =>{
            if(songl.month === parseInt(req.params.year)){
                songsOutput.push(songl);
            }
        });
    }

    res.send(songsOutput);
})

app.get('/api/songs/month/:month',(req,res)=>{
    const song = songs.find(c=> c.month === parseInt(req.params.month));
    songsOutput = [];
    if (!song){
        res.status(404).send("The genre with the given month was not found");
        return
    } else {
        songs.forEach(songl =>{
            if(songl.month === parseInt(req.params.month)){
                songsOutput.push(songl);
            }
        });
    }

    res.send(songsOutput);
})


//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/songs', (req,res)=>{
    // you write the if code here
    //add an if statement so that the name of the song you post is .min(3) characters 
    if(req.body.name.length > 2){
        const song ={
            //we assign an ID and a name property
            id: songs.length +1,
            name: req.body.name,
            year: parseInt(req.body.year),
            month : parseInt(req.body.month)
        };
        //YOU WRITE THE NEXT LINES OF code
        //next step: push it to the array
        songs.push(song);
        //next step: the server should return the new resource to the client in the body of the response
        
        
        res.send(songs);
    } else {
        res.status(404).send("A name is required and should be greater than 2 characters long")
    }

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/api/songs/:id', (req,res)=>{
    //Write the code in order to look up the song, if not existing return a 404
    n = true;
    songs.forEach(element => {
        if(req.body.name === element.name){
            n = false;
            res.status(404).send("Genre already exists")
        }
    });
    if (!req.body.name || req.body.name.length < 2){
        res.status(400).send("Name is required and should be at least 2 characters long");
        n = false;
    }

    if (n){
        const song ={
            //we assign an ID and a name property
            id: req.body.id,
            name: req.body.name,
            year: parseInt(req.body.year),
            month : parseInt(req.body.month)
        };
        songs.splice(req.body.id - 1, 1, song);
        res.status(200).send(song);
    }
            //otherwise 
                    //update the song
                    //return the updated song
});



//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/songs/:id', (req,res)=>{
    //code the following logic
    //look up the song by id
        //return 404 if does not exist
        //delete the song by index HINT: use the indexOf() and splice() methods
        // return the response to the client the song that was deleted
    if (songs.forEach(element => {
        if(element.id === req.body.id){
            return false;
        }
    })){
        res.status(404).send("Genre doesn't exist")
    } else {
        const delsong = songs.slice(req.body.id -1, req.body.id);
        songs.splice(req.body.id - 1, 1);
        res.status(200).send(delsong);
    }

});




app.listen(3000, () => {
    console.log('Listening om port 3000...')
})