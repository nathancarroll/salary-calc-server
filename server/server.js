let express = require('express');

let app = express(); // Make a server
const PORT = 5000;

app.use(express.static('server/public'));

// Allow for incoming requests
app.listen(PORT, function(){
    console.log('App is running on port', PORT);
})
