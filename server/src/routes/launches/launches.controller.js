const {launches,addNewLaunch,deleteLaunch,getLaunchBykey} = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
   return res.status(200).json(Array.from(launches.values()));
}

const httpAddNewLanche = (req,res) => {
    const  launch = {
       mission: req.body.mission,
       rocket: req.body.rocket,
       destination : req.body.destination,
       launchDate : new Date(req.body.launchDate)
    }
    let hasNullValue = Object.values(launch).some(o => o === null ||  o === "");
    if(hasNullValue){
        return res.status(400).json({message : "please privide valid properties", error: true})
    }
    let hasInvalideDate = launch.launchDate.toString() === "Invalid Date"
    if(hasInvalideDate){
        return res.status(400).json({message : "Invalid date", error: true})
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
} 

const httpDeletLaunch = (req,res) =>{
    const flightNumber = +req.params.flightNumber;
    const lauchToDelete =  getLaunchBykey(flightNumber);
    if(!lauchToDelete) return res.status(404).json({ message: "flight doest not exit",error: true})
    console.log(lauchToDelete,flightNumber);
    deleteLaunch(flightNumber);
    return res.status(200).json(lauchToDelete);
}
module.exports = {
    getAllLaunches,
    httpAddNewLanche,
    httpDeletLaunch  
}  