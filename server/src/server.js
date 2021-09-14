const app = require("./app");
const PORT = process.env.PORT ? process.env.PORT : 8000 ; 
const http = require("http");
const  {loadPlanetsData} = require("./models/planets.model")
const server = http.createServer(app);

const  startServer =  async () => {
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(PORT);
        console.log("server is running")
    })
}

startServer();