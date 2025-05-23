import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'svg', 'png', 'pdf'], // add formats as needed
  },
});

const upload = multer({ storage });

export default upload;
