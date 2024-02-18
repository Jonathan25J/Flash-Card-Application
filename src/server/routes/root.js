import { Router } from 'express';
const router = Router()

router.get('/', (req, res) => {
    res.render('index.html')
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

export default router