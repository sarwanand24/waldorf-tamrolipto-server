import Admin from "../models/admin.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const login = asyncHandler(
async(req,res)=>{

    const {email,password}=req.body;

    const admin =
    await Admin.findOne({email});

    if(!admin){
        throw new ApiError(
            404,
            "Admin not found"
        );
    }

        console.log("Entered Password:", password);
console.log("Stored Hash:", admin.password);

    const valid =
    await admin.isPasswordCorrect(
        password
    );

    console.log("Password Match:", valid);

    if(!valid){
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

    const token =
    admin.generateAccessToken();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                admin,
                token
            },
            "Login Success"
        )
    );
});

export const logoutAdmin = asyncHandler( async (
  req,
  res
) => {
  try {

    await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        $set: {
          refreshToken: null
        }
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    };

    return res
      .status(200)
      .clearCookie(
        "accessToken",
        options
      )
      .clearCookie(
        "refreshToken",
        options
      )
      .json({
        success: true,
        message:
          "Logged out successfully"
      });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

export const getCurrentAdmin =
async (req, res) => {

  return res.status(200).json({
    success: true,
    admin: req.admin
  });

};