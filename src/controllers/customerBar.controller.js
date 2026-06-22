import Bar from "../models/bar.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const transformBar = (bar) => {
  const obj = bar.toObject();

  return {
    id: obj._id.toString(),

    propertyId:
      obj.propertyId?.toString(),

    name: obj.name,

    description: obj.description,

    price: obj.price,

    image:
      obj.image?.url || "",

    category:
      obj.category === "non_alcoholic"
        ? "non-alcoholic"
        : obj.category,

    isAvailable:
      obj.isAvailable,

    alcoholContent:
      obj.alcoholContent
        ? `${obj.alcoholContent}%`
        : undefined,
  };
};

const getBarItems = async (req, res, next) => {
    try {

        const bars = await Bar.find({
            propertyId: req.params.propertyId,
            isAvailable: true
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                bars.map(transformBar),
                "Bar items fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getBarItems
};