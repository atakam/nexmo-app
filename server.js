const app = require('./app');
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () =>  {
    console.log(`listening on port ${port}`);
});
