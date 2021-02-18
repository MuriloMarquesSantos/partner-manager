const express = require('express');

const app = express();

app.listen(3333, () => {
    console.log('Server is up and running!');
})

app.get('/', (request, response) => {
    return response.status(200).json({success: 'true'});
})