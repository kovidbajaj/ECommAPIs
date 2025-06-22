import fs from "fs";
const fsPromise=fs.promises; //importing fs Promise based library from fs library

export async function log(logData){
    try{
        logData="\n"+ "Timestamp: "+ new Date().toString()+", "+logData;
    await fsPromise.appendFile('log.txt',logData);
    }catch(err){
        console.log(err);
    }
}
const loggerMiddleware=async (req,res,next)=>{
    // Log the requests.
    if(!req.url.includes('signin')){
    const logData=`Req URL: ${req.url}, Req body: ${JSON.stringify(req.body)}, User Agent: ${req.headers["user-agent"]}`;
    await log(logData);
    }
    next();
}
export default loggerMiddleware;
