import ContactMessage from "../models/contactMessage.model.js";

export const seedContactMessages = async () => {

    const contactMessages = [
        {
            name: "Thomas Anderson",

            email: "thomas.a@email.com",

            phone: "+1 (555) 666-7777",

            subject: "Wedding Venue Inquiry",

            message:
                "Hello, I would like to inquire about hosting our wedding at Hotel Tamrolipto in September. We are planning for approximately 150 guests. Could you please share information about venue packages and availability?",

            isRead: false,

            isArchived: false
        },

        {
            name: "Rachel Green",

            email: "rachel.g@email.com",

            phone: "+1 (555) 777-8888",

            subject: "Corporate Event Booking",

            message:
                "We are interested in booking a conference room for our annual company meeting. We would need space for approximately 50 people with catering services for lunch. Please let me know available dates in July.",

            isRead: true,

            isArchived: false
        },

        {
            name: "Marcus Cole",

            email: "marcus.c@email.com",

            subject: "Room Service Feedback",

            message:
                "I wanted to commend your room service team. The food was delivered promptly and was absolutely delicious. Special thanks to the chef for accommodating my dietary restrictions.",

            isRead: true,

            isArchived: false
        }
    ];

    await ContactMessage.deleteMany({});

    await ContactMessage.insertMany(
        contactMessages
    );

    console.log(
        "✅ Contact Messages seeded"
    );
};