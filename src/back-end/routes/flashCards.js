const express = require('express')
const router = express.Router()
const electron = require('electron');
const fs = require('fs');
const path = require('path')

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../front-end/pages/index.html'))
})

// router.get('/writeFile', (req, res) => {
//     const filePath = path.join(electron.app.getPath('userData'), 'example.txt'); // Specify the file path
//     const fileContent = 'This is an example file content.'; // Content to write to the file
  
//     // Write the file asynchronously
//     fs.writeFile(filePath, fileContent, (err) => {
//       if (err) {
//         console.error('Error writing file:', err);
//         res.status(500).send('Error writing file');
//       } else {
//         console.log('File written successfully');
//         res.send('File written successfully');
//       }
//     });
//   });

module.exports = router