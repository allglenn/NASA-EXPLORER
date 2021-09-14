const launches = new Map(); 
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "kepler Exploration",
    rocket : "voyager  2",
    lauchDate : new Date("December 25, 2045"),
    destination: 'kepler-442 b',
    customers : ["Glenn","paris "],
    upcoming : true,
    success:true
}

launches.set(launch.flightNumber,launch);

function addNewLaunch(launch){
    latestFlightNumber++;
    
    launches.set(latestFlightNumber,Object.assign(launch,{
        flightNumber :  latestFlightNumber,
        customers : ["Glenn","paris "]
        ,upcoming: true,
        success :true
    }));
} 
function deleteLaunch(flightNumber){
    const aborded = getLaunchBykey(flightNumber);
    aborded.upcoming = false;
    aborded.success = false;
    return aborded;
};
function getLaunchBykey(flightNumber){
   return  launches.get(flightNumber);
}
module.exports = {
    launches,
    addNewLaunch,
    deleteLaunch,
    getLaunchBykey
}