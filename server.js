/* eslint-disable no-undef */
import app from "./src/app.js";

// Load env not required node --env-file .env

//DB Connection

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port 3000 on http://${process.env.HOSTNAME}:${process.env.PORT}`);
});