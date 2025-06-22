import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        const name=new Date().toISOString().replace(/:/g,'_') +" "+ file.originalname;
        cb(null,name);
    }
});

export const upload=multer({storage});