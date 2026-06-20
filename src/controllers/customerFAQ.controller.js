import FAQ from "../models/faq.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getFAQs = async (req, res, next) => {
    try {

        const faqs = await FAQ
            .find()
            .sort({ order: 1 });

        return res.status(200).json(
            new ApiResponse(
                200,
                faqs,
                "FAQs fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getFAQs
};