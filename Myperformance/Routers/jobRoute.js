import express from "express";
// import { RateLimiterMemory } from 'rate-limiter-flexible';
import { jobregisterController, jobgetController, jobupdateController, jobdeleteController, statController } from "../Controllers/jobController.js";

let jobuser = express.Router();
/**
 * @swagger
 * components:
 *   schemas: 
 *     job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - status
 *         - worktype
 *         - worklocation
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the job entry
 *         company:
 *           type: string
 *           description: The company where the job is located
 *         position:
 *           type: string
 *           description: The job position
 *         status:
 *           type: string
 *           description: The current status of the job
 *           enum: [OPEN, CLOSED, PENDING]  # Example Enum values
 *         worktype:
 *           type: string
 *           description: Type of work (e.g., Remote, On-site)
 *           enum: [REMOTE, ONSITE]
 *         worklocation:
 *           type: string
 *           description: The location of the work (city, country, etc.)
 *       example:
 *         id: GHKHHJKKLJKJ
 *         company: Arman
 *         position: MANAGER
 *         status: OPEN
 *         worktype: REMOTE
 *         worklocation: New York
 */

jobuser.post("/register", jobregisterController); // Endpoint to register a job
jobuser.get("/get", jobgetController); // Endpoint to get job details
jobuser.put("/update/:id", jobupdateController); // Endpoint to update job by id
jobuser.delete("/delete/:id", jobdeleteController); // Endpoint to delete job by id
jobuser.get("/job-stat/:id", statController); // Endpoint to get job statistics by id

export default jobuser;
