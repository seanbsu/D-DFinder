module.exports = [
  {
    id: 1,
    email: "l@gmail.com",
    password: "123456",
    firstname: "Leane",
    charactername: "Leanne Stormcloak",
    characterClass: "rogue",
    characterLevel: "20",
    campaign: "",
    bio: "",
    otheruser: [],
    like: [],
    dislike: [],
    match: [2, 4],
    messages: [
      {
        matchId: 2,
        conversation: [
          {
            senderId: 1,
            content: "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
            timestamp: "2024-04-09T12:00:00Z"
          },
          {
            senderId: 2,
            content: "Someone like you. Someone who'll rattle the cages.",
            timestamp: "2024-04-09T12:05:00Z"
          }
        ]
      },
      {
        matchId: 4,
        conversation: [
          {
            senderId: 1,
            content: "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
            timestamp: "2024-04-09T12:01:00Z"
          },
          {
            senderId: 4,
            content: "Bats frighten me. It's time my enemies shared my dread.",
            timestamp: "2024-04-09T12:05:00Z"
          }
        ]
      }
    ],
    uri: require("./1.jpg")
  },
  {
    id: 2,
    email: "k@gmail.com",
    password: "123456",
    firstname: "Henry",
    charactername: "Krilkath Rhorinn",
    characterClass: "sorcerer",
    characterLevel: "",
    campaign: "",
    bio: "",
    otheruser: [],
    like: [],
    dislike: [],
    match: [1],
    status: "Offline",
    messages: [
      {
        matchId: 1,
        conversation: [
          {
            senderId: 1,
            content: "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
            timestamp: "2024-04-09T12:00:00Z"
          },
          {
            senderId: 2,
            content: "Someone like you. Someone who'll rattle the cages.",
            timestamp: "2024-04-09T12:05:00Z"
          }
        ]
      }
    ],
    uri: require("./2.jpg")
  },
  {
    id: 3,
    email: "y@gmail.com",
    password: "123456",
    firstname: "Juan",
    charactername: "Yinlar Sunshadow",
    characterClass: "sorcerer",
    characterLevel: "",
    campaign: "",
    bio: 'Straight, Single, 6"',
    otheruser: [],
    like: [],
    dislike: [],
    match: [],
    status: "Offline",
    messages: [],
    uri: require("./3.jpg")
  },
  {
    id: 4,
    email: "d@gmail.com",
    password: "123456",
    firstname: "Jenny",
    charactername: "Damxius",
    characterClass: "sorcerer",
    characterLevel: "8",
    campaign: "Fighter",
    bio: "",
    otheruser: [],
    like: [],
    dislike: [],
    match: [1],
    status: "Online",
    messages: [
      {
        matchId: 1,
        conversation: [
          {
            senderId: 1,
            content: "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
            timestamp: "2024-04-09T12:01:00Z"
          },
          {
            senderId: 4,
            content: "Bats frighten me. It's time my enemies shared my dread.",
            timestamp: "2024-04-09T12:05:00Z"
          }
        ]
      }
    ],
    uri: require("./4.jpg")
  },
  {
    id: 5,
    email: "ls@gmail.com",
    password: "123456",
    firstname: "John",
    charactername: "Liow Shuay",
    characterClass: "bard",
    characterLevel: "10",
    campaign: "Mountain",
    bio: 'Straight, Single, 5"10',
    otheruser: [],
    like: [],
    dislike: [],
    match: [],
    status: "Offline",
    messages: [],
    uri: require("./5.jpg")
  },
  {
    id: 6,
    email: "a@gmail.com",
    password: "123456",
    firstname: "John",
    charactername: "Ryllyn Torate",
    characterClass: "bard",
    characterLevel: 10,
    campaign: "The Lost Mine of Phandelver",
    bio: "Part time Singer/Dancer",
    otheruser: [],
    like: [],
    dislike: [],
    match: [],
    status: "Offline",
    messages: [],
    uri: require("./6.jpg")
  }
];
