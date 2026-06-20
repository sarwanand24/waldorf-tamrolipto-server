import Property from "../models/property.model.js";
import Admin from "../models/admin.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import Settings from "../models/settings.model.js";

export const getSettings = async (req, res, next) => {
  try {

    const property = await Property.findOne();

    const admin = req.admin
      ? await Admin.findById(req.admin._id)
          .select("-password -refreshToken")
      : null;

    const notificationSettings =
      await Settings.findOne();

      console.log('chack anu--', admin)

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          business: {
            companyName: property?.name || "",
            email: property?.contact?.email || "",
            phone: property?.contact?.phone || "",
            website: property?.contact?.website || "",
            address: property?.location?.address || "",
          },

          social: {
            facebook:
              property?.socialLinks?.facebook || "",
            instagram:
              property?.socialLinks?.instagram || "",
            twitter:
              property?.socialLinks?.twitter || "",
            linkedin:
              property?.socialLinks?.linkedin || "",
          },

          profile: admin,

          notifications:
            notificationSettings || {
              emailBookings: true,
              emailReservations: true,
              emailOrders: true,
              emailEnquiries: true,
              pushBookings: true,
              pushOrders: false,
            }
        },
        "Settings fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

export const updateBusinessSettings = async (
  req,
  res,
  next
) => {
  try {

    const {
      companyName,
      email,
      phone,
      website,
      address
    } = req.body;

    const property =
    await Property.findOneAndUpdate(
      {},
      {
        name: companyName,

        "contact.email": email,
        "contact.phone": phone,
        "contact.website": website,

        "location.address": address
      },
      {
        new: true
      }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        property,
        "Business settings updated"
      )
    );

  } catch (error) {
    next(error);
  }
};

export const updateSocialLinks = async (
  req,
  res,
  next
) => {
  try {

    const {
      facebook,
      instagram,
      twitter,
      linkedin
    } = req.body;

    const property =
    await Property.findOneAndUpdate(
      {},
      {
        socialLinks: {
          facebook,
          instagram,
          twitter,
          linkedin
        }
      },
      {
        new: true
      }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        property.socialLinks,
        "Social links updated"
      )
    );

  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req,
  res,
  next
) => {
  try {

    const {
      name,
      email
    } = req.body;

    const admin =
    await Admin.findByIdAndUpdate(
      req.admin._id,
      {
        name,
        email
      },
      {
        new: true
      }
    ).select("-password -refreshToken");

    return res.status(200).json(
      new ApiResponse(
        200,
        admin,
        "Profile updated"
      )
    );

  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req,
  res,
  next
) => {
  try {

    const {
      currentPassword,
      newPassword
    } = req.body;

    const admin =
    await Admin.findById(req.admin._id);

    const isValid =
    await admin.isPasswordCorrect(
      currentPassword
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    admin.password = newPassword;

    await admin.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Password changed successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

//Notifications Setting--
export const updateNotifications = async (
  req,
  res,
  next
)=>{
try{

    const settings =
    await Settings.findOneAndUpdate(
        {},
        req.body,
        {
            new:true,
            upsert:true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            settings,
            "Notification settings updated"
        )
    );

}catch(error){
    next(error);
}
};