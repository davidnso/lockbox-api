const client = require('mongodb');


let db;
client.connect('mongouri').then(store=>{
    db=store;
})

db.collection('access-logs').insert('');