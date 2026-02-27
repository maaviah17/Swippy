const app = require("./src/app");
const connectDB = require("./src/db/db")

const PORT = 3000

async function startServer(){
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`started server at port:${PORT}`)
    })
}

startServer();