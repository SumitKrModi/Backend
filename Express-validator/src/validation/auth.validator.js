import {body, validationResult} from "express-validator";

const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    res.status(400).json({errors: errors.array()});
}
export const validateRegister = [
    body("username").isString().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").custom((value) => {
        if(value.length < 8){
            throw new Error("Password must be at least 8 characters long");
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
            throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
        }
        return true;
    }),
    validate
]