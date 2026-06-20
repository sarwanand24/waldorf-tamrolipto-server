import Testimonial from "../models/testimonial.model.js";
import Property from "../models/property.model.js"

export const seedTestimonials = async () => {

        const waldorf =
            await Property.findOne({
                slug: "hotel-the-waldorf"
            });
        
            const tamrolipto =
            await Property.findOne({
                slug: "hotel-tamrolipto"
            });
        
            if(!waldorf || !tamrolipto){
                throw new Error(
                    "Properties must be seeded first"
                );
            }

    const testimonials = [
        {
            propertyId:
                waldorf._id,

            guestName: "John Smith",

            rating: 5,

            comment:
                "Exceptional experience from start to finish. The staff went above and beyond to make our anniversary special. The room was immaculate and the restaurant food was outstanding.",

            date: new Date("2024-06-10"),

            location: "New York, USA",

            isPublished: true
        },

        {
            propertyId:
                waldorf._id,

            guestName: "Emma Thompson",

            rating: 4,

            comment:
                "Beautiful hotel with great amenities. The spa was amazing. Only wish the check-in process was faster.",

            date: new Date("2024-06-05"),

            location: "London, UK",

            isPublished: true
        },

        {
            propertyId:
                tamrolipto._id,

            guestName: "Carlos Mendez",

            rating: 5,

            comment:
                "The beachfront location is unbeatable. Woke up to the sound of waves every morning. The rooftop bar offers spectacular sunset views. Will definitely return!",

            date: new Date("2024-06-08"),

            location: "Miami, USA",

            isPublished: true
        },

        {
            propertyId:
                tamrolipto._id,

            guestName: "Lisa Wong",

            rating: 5,

            comment:
                "Presidential suite exceeded all expectations. The private pool and butler service made our family vacation truly memorable. Kids loved the beach activities.",

            date: new Date("2024-06-01"),

            location: "Singapore",

            isPublished: true
        }
    ];

    await Testimonial.deleteMany({});

    await Testimonial.insertMany(
        testimonials
    );

    console.log(
        "✅ Testimonials seeded"
    );
};