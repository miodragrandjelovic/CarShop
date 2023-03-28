const multer = require("multer");

const storageEngine = multer.diskStorage({
    destination:  (req, file, cb) => {

      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid Mime Type");  
      if(isValid){  
        error = null;  
      }    
      cb(error, "images/"+req.user.email+"/"+req.ui); 
    
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('_');  
      const ext = MIME_TYPE_MAP[file.mimetype];  
      cb(null, name+ '-'+ Date.now()+ '.'+ ext);  
    }
  });

  const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
  };  

const upload = multer({
    storage: storageEngine,
});


module.exports=upload