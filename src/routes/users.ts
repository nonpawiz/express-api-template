import { router as userRoute } from ".";
const users = [
  {
    id: 1,
    name: "Alice",
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "Charlie",
  },
];

// GET /users - Returns a list of users
userRoute.get("/", (req, res) => {
  res.json(users);
});

export default userRoute;
