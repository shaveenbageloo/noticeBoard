const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;

// Serve the message board
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'message.html'));
});

// Admin editor (WYSIWYG)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'editor.html'));
});

app.use(express.static(__dirname));


// Serve message.html for fetch in editor
app.get('/message.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'message.html'));
});

// Save edited HTML
app.use(express.urlencoded({ extended: true }));
app.post('/save', (req, res) => {
  fs.writeFileSync('message.html', req.body.html);
  res.redirect('/admin');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
