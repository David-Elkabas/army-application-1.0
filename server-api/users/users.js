const users = [
  {
    id: "1",
    username: "sapir",
    password: "12345",
    isAdmin: false,
    unitAccess: ["36"],
  },
  {
    id: "2",
    username: "mayan",
    password: "12345",
    isAdmin: false,
    unitAccess: ["lomar", "36"],
  },
  {
    id: "3",
    username: "david",
    password: "12345",
    isAdmin: true,
  },
];

module.exports = {
  users,
};
