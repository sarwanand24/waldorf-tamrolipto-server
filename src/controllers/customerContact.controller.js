import ContactMessage from "../models/contactMessage.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const transformContact = (contact) => {
    const obj = contact.toObject();

    return {
        id: obj._id.toString(),

        name: obj.name,
        email: obj.email,
        message: obj.message,

        isRead: obj.isRead,

        createdAt: obj.createdAt
    };
};

const submitContactForm = async (req, res, next) => {
    try {

        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;

        if (
            !name ||
            !email ||
            !message
        ) {
            throw new ApiError(
                400,
                "All required fields are mandatory"
            );
        }

        const contact =
            await ContactMessage.create({
                name,
                email,
                phone,
                subject,
                message,
                isRead: false,
                isArchived: false
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                transformContact(contact),
                "Message sent successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    submitContactForm
};