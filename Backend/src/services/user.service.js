import { StringError } from "../errors/string.error.js";
import { User } from "../models/user.model.js";
import { comparePasswords, createJWT, hashPassword } from "../utils/common.utility.js";



const registerAdminUser = async (req) => {
  try {
    const {name, mobile_number, password} = req.body;

    const user_mobile = await User.findOne({mobile_number:mobile_number});
    if(user_mobile){
        throw new StringError('User already registered with this mobile number');
    }

    if(password === undefined || password === null || password === ""){
        throw new StringError('Password is required');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
        name:name,
        mobile_number:mobile_number,
        password:hashedPassword,
        is_admin:true,
        is_active:true,
    });

    await newUser.save();
    return newUser;

  } catch (error) {
    console.error(error);
    if (error instanceof StringError) {
      throw new StringError(error.message);
    }
    throw error; // Rethrow the error for the caller to handle
  }
   
}

const loginAdminUser = async (req) => {
  try {
    const {mobile_number, password} = req.body;
    
    if(mobile_number === undefined || mobile_number === null || mobile_number === ""){
        throw new StringError('Mobile number is required');
    }

    if(password === undefined || password === null || password === ""){
        throw new StringError('Password is required');
    }

    const user = await User.findOne({mobile_number:mobile_number});

    if(!user){
        throw new StringError('User not found');
    }

    if(!user.is_active){
        throw new StringError('User is not active');
    }

    if(user.is_admin !== true){
        throw new StringError('User is not an admin');
    }

    if(!await comparePasswords(password, user.password)){
        throw new StringError('Password is incorrect');
    }

    const jwt = createJWT({user});

    return {user,jwt};

  } catch (error) {
    console.error(error);
    if (error instanceof StringError) {
      throw new StringError(error.message);
    }
    throw error; // Rethrow the error for the caller to handle
  }
}


export default { registerAdminUser, loginAdminUser };
