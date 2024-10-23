const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.)?(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
})


// Route Handlers.
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();
}, (req, res) => {
    res.write('Hello World!');
    res.end();
})

const one = (req, res, next) => {
    console.log('first')
    res.write('one\n')
    next();
}
const two = (req, res, next) => {
    console.log('second')
    res.write('two\n')
    next();
}
const three = (req, res) => {
    console.log('third')
    res.write('three')
    res.end()
}

app.get('/chain(.html)?', [one, two, three])
// 


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));