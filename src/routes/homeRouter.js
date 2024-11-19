import express from "express";
import users from "../../data/users.json" assert { type: "json" };
import fs from "fs";

const homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    res.status(200).json(users);
    res.end();
});

homeRoute.get("/users", (req, res) => {
    res.status(200).json(users);
    res.end();
});

homeRoute.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    res.status(200).json(user);
    res.end();
});

/* 
"id": 8,
        "email": "william@gmail.com",
        "username": "hopkins",
        "password": "William56$hj",
        "name": {
            "firstname": "william",
            "lastname": "hopkins"
        },
        "phone": "1-478-001-0890",
        "__v": 0

        */

homeRoute.post("/users", (req, res) => {
    const { address, username, email, password, name, phone, __v } = req.body;
    const id = users[users.length - 1].id + 1;
    const user = { id, address, username, email, password, name, phone, __v };
    users.push(user);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(201).json(user);
    res.end();
});

homeRoute.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { address, username, email, password, name, phone, __v } = req.body;
    const user = users.find((user) => user.id == id);
    user.address = address || JSON.parse(user.address);
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.name = name || JSON.parse(user.name);
    user.phone = phone || user.phone;
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(200).json(user);
    res.end();
});



homeRoute.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    users.splice(users.indexOf(user), 1);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(200); 
    res.end();
});

export default homeRoute;