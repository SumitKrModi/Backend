export async function registerUser(req,res,next) {
    try{
        throw new Error("password is too short and it must be atleast 8 characters");
    }
    catch(error){
        error.status = 400;
        next(error);
    }
}
