import Food from "../models/food.model.js";
import Property from "../models/property.model.js";

export const seedFoods = async () => {

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

    const foods = [

        {
            propertyId: waldorf._id,
            name: "Truffle Risotto",
            description:
            "Creamy Arborio rice with black truffle, parmesan, and aged balsamic reduction",
            price: 42,

            image: {
                url: "https://images.pexels.com/photos/14737/pexels-photo-14737.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "mains",
            isVegetarian: true,
            isVegan: false,
            containsAllergens: [
                "Dairy",
                "Gluten"
            ],
            preparationTime: 25,
            isAvailable: true
        },

        {
            propertyId: waldorf._id,
            name: "Grilled Sea Bass",
            description:
            "Pan-seared Mediterranean sea bass with herb butter, seasonal vegetables",
            price: 56,

            image: {
                url: "https://images.pexels.com/photos/10596194/pexels-photo-10596194.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "mains",
            isVegetarian: false,
            isVegan: false,
            containsAllergens: [
                "Fish"
            ],
            preparationTime: 20,
            isAvailable: true
        },

        {
            propertyId: waldorf._id,
            name: "Caesar Salad",
            description:
            "Crisp romaine lettuce, house-made Caesar dressing, croutons, shaved parmesan",
            price: 18,

            image: {
                url: "https://images.pexels.com/photos/2293327/pexels-photo-2293327.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "salads",
            isVegetarian: true,
            isVegan: false,
            containsAllergens: [
                "Dairy",
                "Fish",
                "Gluten"
            ],
            preparationTime: 10,
            isAvailable: true
        },

        {
            propertyId: waldorf._id,
            name: "Lobster Bisque",
            description:
            "Rich and creamy lobster soup with cognac and fresh herbs",
            price: 28,

            image: {
                url: "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "soups",
            isVegetarian: false,
            isVegan: false,
            containsAllergens: [
                "Shellfish",
                "Dairy"
            ],
            preparationTime: 15,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,
            name: "Grilled Octopus",
            description:
            "Tender octopus with fingerling potatoes, chorizo, and paprika oil",
            price: 38,

            image: {
                url: "https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "appetizers",
            isVegetarian: false,
            isVegan: false,
            containsAllergens: [
                "Shellfish"
            ],
            preparationTime: 20,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,
            name: "Wagyu Beef Steak",
            description:
            "A5 Japanese Wagyu with truffle butter, roasted vegetables, and red wine jus",
            price: 185,

            image: {
                url: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "mains",
            isVegetarian: false,
            isVegan: false,
            containsAllergens: [],
            preparationTime: 30,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,
            name: "Vegan Buddha Bowl",
            description:
            "Quinoa, roasted chickpeas, avocado, kale, tahini dressing",
            price: 26,

            image: {
                url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "salads",
            isVegetarian: true,
            isVegan: true,
            containsAllergens: [
                "Sesame"
            ],
            preparationTime: 15,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,
            name: "Chocolate Fondant",
            description:
            "Warm chocolate lava cake with vanilla ice cream and berry compote",
            price: 16,

            image: {
                url: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "desserts",
            isVegetarian: true,
            isVegan: false,
            containsAllergens: [
                "Dairy",
                "Eggs",
                "Gluten"
            ],
            preparationTime: 18,
            isAvailable: true
        }
    ];

    await Food.deleteMany();

    await Food.insertMany(
        foods
    );

    console.log(
        "✅ Foods seeded successfully"
    );
};