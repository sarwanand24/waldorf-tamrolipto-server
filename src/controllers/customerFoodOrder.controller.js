import FoodOrder from "../models/foodOrder.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const transformFoodOrder = (order) => {
  const obj = order.toObject();

  return {
    id: obj._id.toString(),

    propertyId: obj.propertyId,

    guestName: obj.customerName,

    guestPhone: obj.phone,

    date: new Date(obj.createdAt)
      .toISOString()
      .split("T")[0],

    time: new Date(obj.createdAt)
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),

    items:
      obj.items?.map((item, index) => ({
        foodItemId: index.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })) || [],

    totalPrice: obj.totalAmount,

    status:
      obj.status === "accepted"
        ? "confirmed"
        : obj.status,

    createdAt: obj.createdAt,
  };
};

const submitFoodOrder = async (req, res, next) => {
  try {
    const {
      propertyId,
      guestName,
      guestPhone,
      items,
      totalPrice,
    } = req.body;

    if (
      !propertyId ||
      !guestName ||
      !guestPhone ||
      !items?.length
    ) {
      throw new ApiError(
        400,
        "All required fields are mandatory"
      );
    }

    const order = await FoodOrder.create({
      propertyId,

      customerName: guestName,

      phone: guestPhone,

      items,

      totalAmount: totalPrice,

      status: "pending",
    });

    return res.status(201).json(
      new ApiResponse(
        201,
        transformFoodOrder(order),
        "Food order submitted successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export {
  submitFoodOrder,
};