import Room from "../models/room.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const transformRoom = (room) => {
  const obj = room.toObject();

  return {
    ...obj,

    id: obj._id.toString(),

    propertyId: obj.propertyId?.toString(),

    images:
      obj.images?.map(
        (img) => img.url
      ) || [],
  };
};

const getRooms = async (req, res, next) => {
    try {

        const { propertyId } = req.query;

        if (!propertyId) {
            throw new ApiError(400, "Property ID required");
        }

        const rooms = await Room.find({
            propertyId,
            isAvailable: true
        })
        .sort({ basePrice: 1 });

        return res.status(200).json(
            new ApiResponse(
                200,
                rooms.map(transformRoom),
                "Rooms fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

const getRoomBySlug = async (req, res, next) => {
    try {

        const { propertyId, slug } = req.params;

        const room = await Room.findOne({
            propertyId,
            slug
        });

        if (!room) {
            throw new ApiError(404, "Room not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                transformRoom(room),
                "Room fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getRooms,
    getRoomBySlug
};