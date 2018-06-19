module.exports = (app, db) => {
    var ObjectID = require('mongodb').ObjectID;

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) }
        db.collection('notes').findOne(details, (err, item) => {
            if(err)
            res.send({'error':'An error has occurred'});
            else
            res.send(item);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const delid = req.params.id;
        const delDetails = { '_id' : new ObjectID(delid) }
        db.collection('notes').remove(delDetails, (err, item) => {
            if(err)
            res.send({ 'error' : 'some error occured' });
            else
            res.send('Note with id '+delid+' deleted');
        })
    });

    app.put('/notes/:id', (req, res) => {
        const updateid = req.params.id;
        const updID = { '_id' : new ObjectID(updateid) }
        const updateDetails = { title: req.body.title, notes: req.body.body }

        db.collection('notes').update(updID, updateDetails, (err, item) => {
            if(err)
            res.send({ 'error': 'An error has occurred' }); 
            else
            res.send(updateDetails);
        });

    })

    app.post('/notes', (req, res) => {
        const notesData = { title: req.body.title, notes: req.body.body}
        db.collection('notes').insert(notesData, (err, result)=> {
            if(err)
            res.send({ 'error': 'An error has occurred' }); 
            else
            res.send(result.ops[0]);
        });
    });
}