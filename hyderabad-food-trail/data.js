const dishData = [
    {
        id: "biryani",
        name: "Hyderabadi Dum Biryani",
        category: "Main Course",
        diet: "non-veg",
        emoji: "🥘",
        story: "The crown jewel of Hyderabadi cuisine, slow-cooked with meat, rice, and spices sealed with dough.",
        bestAt: "Bawarchi, Paradise, Shah Ghouse",
        spice: 4,
        sweet: 0
    },
    {
        id: "chai",
        name: "Irani Chai & Osmania Biscuit",
        category: "Snacks",
        diet: "veg",
        emoji: "☕🍪",
        story: "A thick, sweet, milky tea paired with a perfectly balanced sweet-and-salty biscuit.",
        bestAt: "Nimrah Cafe, Cafe Niloufer",
        spice: 0,
        sweet: 3
    },
    {
        id: "haleem",
        name: "Mutton Haleem",
        category: "Main Course",
        diet: "non-veg",
        emoji: "🥣",
        story: "A rich, pounded stew of meat, lentils, and wheat, traditionally served during Ramadan.",
        bestAt: "Pista House, Cafe 555",
        spice: 3,
        sweet: 0
    },
    {
        id: "double",
        name: "Double ka Meetha",
        category: "Sweets",
        diet: "veg",
        emoji: "🍞🍯",
        story: "A royal bread pudding dessert made of fried bread slices soaked in hot milk with spices.",
        bestAt: "Hameedi Confectioners",
        spice: 0,
        sweet: 5
    },
    {
        id: "salan",
        name: "Mirchi ka Salan",
        category: "Main Course",
        diet: "veg",
        emoji: "🌶️🥘",
        story: "A popular chili and peanut curry that accompanies Biryani, adding an extra nutty, tangy kick.",
        bestAt: "Usually served with Biryani",
        spice: 4,
        sweet: 1
    },
    {
        id: "qubani",
        name: "Qubani ka Meetha",
        category: "Sweets",
        diet: "veg",
        emoji: "🍑🍦",
        story: "An authentic dessert made from dried apricots, often served with a dollop of thick malai or ice cream.",
        bestAt: "Utsav, Grand Hotel",
        spice: 0,
        sweet: 4
    },
    {
        id: "pathar",
        name: "Pathar ka Gosht",
        category: "Snacks",
        diet: "non-veg",
        emoji: "🥩🔥",
        story: "Mutton marinated in spices and cooked slowly on a heated granite stone for a smoky flavor.",
        bestAt: "Alhamdulillah Hotel, Bade Miyan",
        spice: 3,
        sweet: 0
    },
    {
        id: "lukhmi",
        name: "Mince Lukhmi",
        category: "Snacks",
        diet: "non-veg",
        emoji: "🥟",
        story: "Hyderabad's version of a samosa, square and filled with spicy minced meat. A classic starter.",
        bestAt: "Alpha Hotel, Local Bakeries",
        spice: 3,
        sweet: 0
    }
];

const quizQuestions = [
    {
        question: "What's your ideal Friday night?",
        options: [
            { text: "A massive feast with friends.", scores: { biryani: 3, haleem: 2 } },
            { text: "Late night conversations at a cafe.", scores: { chai: 3, lukhmi: 1 } },
            { text: "Something sweet and comforting.", scores: { double: 3, qubani: 2 } },
            { text: "Spicy food and adventure.", scores: { pathar: 3, salan: 2 } }
        ]
    },
    {
        question: "How do you handle spice?",
        options: [
            { text: "Bring it on! I carry hot sauce.", scores: { salan: 3, biryani: 2 } },
            { text: "I like a balanced kick.", scores: { pathar: 2, haleem: 2 } },
            { text: "Mild, please.", scores: { lukhmi: 2, biryani: 1 } },
            { text: "I prefer sweets.", scores: { chai: 2, double: 3 } }
        ]
    },
    {
        question: "Choose a vibe:",
        options: [
            { text: "Royal and grand", scores: { biryani: 3, double: 2 } },
            { text: "Bustling street corner", scores: { chai: 3, lukhmi: 2 } },
            { text: "Slow and methodical", scores: { haleem: 3, pathar: 2 } },
            { text: "Unexpected and tangy", scores: { salan: 3, qubani: 2 } }
        ]
    },
    {
        question: "What's your favorite texture?",
        options: [
            { text: "Fluffy and layered", scores: { biryani: 3, lukhmi: 2 } },
            { text: "Rich and creamy/mushy", scores: { haleem: 3, double: 2 } },
            { text: "Liquid and comforting", scores: { chai: 3, salan: 2 } },
            { text: "Chewy and tender", scores: { pathar: 3, qubani: 2 } }
        ]
    },
    {
        question: "Pick a time of day:",
        options: [
            { text: "Early Morning (6 AM)", scores: { chai: 3 } },
            { text: "Lunchtime (1 PM)", scores: { biryani: 3, salan: 2 } },
            { text: "Evening Snack (5 PM)", scores: { lukhmi: 3, chai: 1 } },
            { text: "Late Night (11 PM)", scores: { haleem: 3, pathar: 3 } }
        ]
    },
    {
        question: "How patient are you?",
        options: [
            { text: "I can wait hours for perfection.", scores: { haleem: 3, pathar: 2 } },
            { text: "I like a slow buildup.", scores: { biryani: 2, chai: 2 } },
            { text: "I want it now!", scores: { lukhmi: 3, salan: 2 } },
            { text: "Only if the reward is sweet.", scores: { double: 3, qubani: 3 } }
        ]
    }
];

const foodFacts = [
    "The word 'Biryani' comes from the Persian word 'Birian', which means 'fried before cooking'.",
    "Irani cafes in Hyderabad were started by settlers from Persia (Iran) in the early 20th century.",
    "Haleem was originally an Arab dish called 'Harees', brought to Hyderabad by the Chaush people.",
    "Osmania biscuits were named after Mir Osman Ali Khan, the last Nizam of Hyderabad.",
    "Pathar ka Gosht was reportedly invented to satisfy a Nizam's sudden craving for meat during a hunting trip.",
    "Lukhmi literally means 'a small bite' in Urdu."
];
