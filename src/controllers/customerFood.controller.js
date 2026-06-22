import Food from "../models/food.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const categoryMap = {
  appetizers: "starters",
  soups: "starters",
  salads: "starters",
  breakfast: "main-course",
  mains: "main-course",
  sides: "main-course",
  desserts: "desserts",
  beverages: "beverages",
};

const transformFood = (food) => {
  const obj = food.toObject();

  return {
    ...obj,

    id: obj._id.toString(),

    propertyId:
      obj.propertyId?.toString(),

    image:
      obj.image?.url || "",

    category:
      categoryMap[obj.category] ||
      "main-course",
  };
};

export const getFoodItems = async (req, res, next) => {
    try {

        const foods = await Food.find({
            propertyId: req.params.propertyId,
            isAvailable: true
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                foods.map(transformFood),
                "Food items fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};