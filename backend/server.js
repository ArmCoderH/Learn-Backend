import express from "express";

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Arman Hingora");
});

// Jokes API Route
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is joke",
    },
    {
      id: 2,
      title: "A second joke",
      content: "This is second joke",
    },
    {
      id: 3,
      title: "A third joke",
      content: "This is third joke",
    },
    {
      id: 4,
      title: "A fourth joke",
      content: "This is fourth joke",
    },
    {
      id: 5,
      title: "A fifth joke",
      content: "This is fifth joke",
    },
  ];
  res.json(jokes); 
});

// Dynamic Port Configuration
const port = process.env.PORT || 4000;

// Start the Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
