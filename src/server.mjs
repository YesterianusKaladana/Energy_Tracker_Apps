import express from "express"
import path from "path"

// Create a new express application (server)
const app = express()

//// Set express to use the EJS view engine
app.set("view engine", "ejs")
// Tell express where to find the views in our project
app.set("views", path.join(import.meta.dirname, "/views"))

// Setup middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO: Setup routes

// TODO: redirect / to homepage
app.get("/", (req, res) => {
    res.redirect("/views/location_list.html")
})

// Setup serving of public files (frontend)
app.use(express.static("src/public"))

// Start the server
const port = 8080
app.listen(port, () => 
    console.log("Express application started on http://localhost:" + port)
)