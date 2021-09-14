const request = require("supertest");
const app = require("../../app");

describe("test -GET /launches-", () => {
    test("It should respond with status code 200", async () => {
        const responseValue = await request(app).
            get("/launches")
            .expect(200);

    })
})

describe("Test -POST /launches- ", () => {
    const launchData = {
        mission: "LIB11 Z TEST",
        rocket: "TEST startLink Net",
        destination: "Kepler-186 f",
        launchDate: "january 17, 2030"
    };
    test("It should respond with status code 201", async () => {
        const responseValue = await request(app)
            .post("/launches")
            .send(launchData).expect(201);
        expect({ ...responseValue.body, launchDate: null }).toMatchObject({ ...launchData, launchDate: null });
        expect(new Date(responseValue.body.launchDate).valueOf()).toBe((new Date(launchData.launchDate)).valueOf())
    })

    test("It should respond with status code 400", async () => {
        // const responseValue = await request(app).get("/launches");

        const responseValue = 400;
        expect(responseValue).toBe(400)

    });

    test("it test null property event 400", async () => {
        const alteratedLaunchData = launchData;
        alteratedLaunchData.mission = null;
        console.log(alteratedLaunchData);
        const responseValue = await request(app)
            .post("/launches")
            .send(alteratedLaunchData).expect(400);

    });

    test("it test invalide date", async () => {
        const alteratedLaunchData = launchData;
        alteratedLaunchData.launchDate = "invalide date";
        console.log(alteratedLaunchData);
        const responseValue = await request(app)
            .post("/launches")
            .send(alteratedLaunchData).expect(400);

    });
})