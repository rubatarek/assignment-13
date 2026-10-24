import multer from "multer";

   export const upload = (file) => {
    //disk storage is used to store the file in the disk
    // memory storage is used to store the file in the memory
const storage = multer.diskStorage({
    // destination params req,file, cb da ely howa call back function w de bt2ol fe errors wala 
    // cb de tool ma heya null fa a2dr arf3 sora fe ely howa uploads
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // y3ml unique name for the file
        cb(null,(file.fieldname + '-' + uniqueSuffix + file.originalname))// 3shan amn3 ay conflict
        // a save file name be original name
    }
})

const upload = multer({ storage})
return upload

}