import Room from "../models/room.model.js";
import Property from "../models/property.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    uploadMultipleImages,
    deleteImage
} from "../utils/cloudinaryUpload.js";

const transformRoom = (room) => ({
  id: room._id.toString(),

  propertyId:
    typeof room.propertyId === "object"
      ? room.propertyId._id?.toString()
      : room.propertyId?.toString(),

  propertyName:
    typeof room.propertyId === "object"
      ? room.propertyId.name
      : undefined,

  name: room.name,
  slug: room.slug,
  description: room.description,
  shortDescription: room.shortDescription,

  images: room.images || [],

  basePrice: room.basePrice,
  capacity: room.capacity,
  size: room.size,
  bedType: room.bedType,

  roomType: room.roomType,

  amenities: room.amenities || [],
  features: room.features || [],
  views: room.views || [],

  rating: room.rating,
  reviewCount: room.reviewCount,

  isAvailable: room.status === "available",
  status: room.status,

  createdAt: room.createdAt,
  updatedAt: room.updatedAt,
});

export const getRooms = asyncHandler(async (req, res) => {
  const { propertyId } = req.query;

  const filter = {};
  if (propertyId) filter.propertyId = propertyId;

  const rooms = await Room.find(filter).populate(
    "propertyId",
    "name"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      rooms.map(transformRoom),
      "Rooms fetched successfully"
    )
  );
});

export const getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id).populate("propertyId");

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
});

export const createRoom = asyncHandler(async (req, res) => {
  const { propertyId } = req.body;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const data = { ...req.body };

  // parse if needed (future-safe like Property)
  if (data.amenities) data.amenities = JSON.parse(data.amenities);
  if (data.features) data.features = JSON.parse(data.features);
  if (data.views) data.views = JSON.parse(data.views);

  // IMAGE UPLOAD (same pattern as Property)
  if (req.files?.length) {
    const uploadedImages = await uploadMultipleImages(
      req.files,
      "rooms"
    );

    data.images = uploadedImages.map((img) => ({
      url: img.url,
      publicId: img.public_id,
    }));
  }

  const room = await Room.create(data);

  return res.status(201).json(
    new ApiResponse(
      201,
      transformRoom(room),
      "Room created successfully"
    )
  );
});

export const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  const data = { ...req.body };

  // parse arrays if sent as JSON strings
  if (data.amenities) data.amenities = JSON.parse(data.amenities);
  if (data.features) data.features = JSON.parse(data.features);
  if (data.views) data.views = JSON.parse(data.views);

  // IMAGE REPLACEMENT LOGIC (same as Property)
  if (req.files?.length) {
    if (room.images?.length) {
      for (const image of room.images) {
        if (image.publicId) {
          await deleteImage(image.publicId);
        }
      }
    }

    const uploadedImages = await uploadMultipleImages(
      req.files,
      "rooms"
    );

    data.images = uploadedImages.map((img) => ({
      url: img.url,
      publicId: img.public_id,
    }));
  }

  const updatedRoom = await Room.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("propertyId", "name");

  return res.status(200).json(
    new ApiResponse(
      200,
      transformRoom(updatedRoom),
      "Room updated successfully"
    )
  );
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  if (room.images?.length) {
    for (const image of room.images) {
      if (image.publicId) {
        await deleteImage(image.publicId);
      }
    }
  }

  await room.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, {}, "Room deleted successfully")
  );
});

export const toggleRoomAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const room = await Room.findById(id);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  room.status = status;
  room.isAvailable = status === "available";

  await room.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      transformRoom(room),
      "Room status updated"
    )
  );
});