const BOOKS = [
  {
    id: 1,
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",

    chapters: [
      {
        missions: [
          { text: "A mysterious letter arrives at Baker Street." },
          { text: "Holmes begins analyzing the handwriting." }
        ],
        quiz: {
          q: "What starts the investigation?",
          options: ["Letter", "Crime", "Fire"],
          answer: "Letter"
        }
      }
    ]
  },

  {
    id: 2,
    title: "Alice in Wonderland",
    author: "Lewis Carroll",

    chapters: [
      {
        missions: [
          { text: "Alice follows a strange rabbit into a hole." }
        ],
        quiz: {
          q: "Where does she go?",
          options: ["Wonderland", "Forest", "Sea"],
          answer: "Wonderland"
        }
      }
    ]
  }
];
