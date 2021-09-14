const path = require("path");
const csvparse = require('csv-parse');
const fs = require("fs");
const planets = [];

/**
 * filtering planet based on koi_disposition property
 * @param {*} currentplanet 
 * @returns 
 */
function isHabitable(currentplanet) {
    return currentplanet["koi_disposition"] === 'CONFIRMED'
        && currentplanet['koi_insol'] > 0.36
        && currentplanet["koi_insol"] < 1.11
        && currentplanet["koi_prad"] < 1.6
        ;
}
const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
                .pipe(csvparse(
                    {
                        comment: "#",
                        columns: true,
                    }
                ))
                .on("data", (data) => {
                    if (isHabitable(data)) {
                        planets.push(data.kepler_name);
                    }
                }).on("err", (err) => {
                    reject(err);
                }).on("end", () => {
                    resolve()
                });
        } catch (error) {
            reject(error);
        }

    })
}


module.exports = {
    planets,
    loadPlanetsData
};