const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save the image
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, Date.now() + ext); // Use a timestamp to avoid name conflicts
  }
});

const upload = multer({ storage: storage });

// Define the upload route
app.post('/upload', upload.single('profilePicture'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const imageUrl = `/uploads/${file.filename}`; // URL to access the image

  // Now, save this image URL in your database along with the other profile data
  const updatedProfileData = {
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    profilePicture: imageUrl
  };

  // Update your profile in the database (assuming you have a User model)
  User.findByIdAndUpdate(req.user.id, updatedProfileData, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).send('Error updating profile');
    }
    res.status(200).send(user);
  });
});
