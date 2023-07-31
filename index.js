const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

// to parse the body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Our fake database:
let comments = [
	{
		id: uuid(),
		username: "Todd",
		comment: "lol that is so funny!",
	},
	{
		id: uuid(),
		username: "Skyler",
		comment: "I like to go birdwatching with my dog",
	},
	{
		id: uuid(),
		username: "Sk8erBoi",
		comment: "Plz delete your account, Todd",
	},
	{
		id: uuid(),
		username: "onlysayswoof",
		comment: "woof woof woof",
	},
];

// index/display GET /comments - display all comments
// new GET /comments/new - form to create new comment
// create POST /comments - creates new comment on server
// show GET /comments/:id - details for one specific comment
// edit GET /comments/:id/edit - form to edit specific comment
// update PATCH /comments/:id - updates specific comment on server
// destroy DELETE /comments/:id - deletes specific item on server

// render comments
app.get("/comments", (req, res) => {
	res.render("comments/index", { comments });
});

// make new comments - form
app.get("/comments/new", (req, res) => {
	res.render("comments/new");
});

// post new comments form
app.post("/comments", (req, res) => {
	// console.log(req.body);
	// res.send("It worked");
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuid() });
	res.redirect("/comments");
});

// show comment
app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/show", { comment });
});

// post edit comments form
app.get("comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render("comments/edit", { comment });
});

// edit comment
app.patch("/comments/:id", (req, res) => {
	const { id } = req.params;
	const foundComment = comments.find((c) => c.id === id);

	//get new text from req.body
	const newCommentText = req.body.comment;
	//update the comment with the data from req.body:
	foundComment.comment = newCommentText;
	//redirect back to index (or wherever you want)
	res.redirect("/comments");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
