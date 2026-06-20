import FAQ from "../models/faq.model.js";

export const seedFAQs = async () => {

    const faqs = [
        {
            question:
                "What are the check-in and check-out times?",

            answer:
                "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in or late check-out can be arranged upon request, subject to availability.",

            category: "booking",

            order: 1
        },

        {
            question:
                "Is parking available at the properties?",

            answer:
                "Yes, both properties offer valet parking and self-parking options. Valet parking is complimentary for suite guests.",

            category: "amenities",

            order: 2
        },

        {
            question:
                "Can I cancel or modify my reservation?",

            answer:
                "Reservations can be cancelled or modified up to 48 hours before check-in without any charge. Within 48 hours, the first night will be charged.",

            category: "policies",

            order: 3
        },

        {
            question:
                "Are pets allowed?",

            answer:
                "We welcome well-behaved pets in select rooms. A pet fee of $50 per night applies. Please inform us at the time of booking.",

            category: "policies",

            order: 4
        },

        {
            question:
                "What dining options are available?",

            answer:
                "Waldorf offers a fine-dining restaurant featuring international cuisine. Hotel Tamrolipto features a beachside restaurant and rooftop bar with stunning ocean views.",

            category: "dining",

            order: 5
        }
    ];

    await FAQ.deleteMany({});

    await FAQ.insertMany(
        faqs
    );

    console.log(
        "✅ FAQs seeded"
    );
};