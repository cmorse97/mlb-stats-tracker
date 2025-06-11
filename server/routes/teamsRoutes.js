import express from "express";
import {
  getAllTeams,
  getTeamByTeamAbv,
  getRosterByTeamAbv,
  getTopPerformers,
  getTeamStandingsController,
} from "../controllers/teamsController.js";

const router = express.Router();

router.get("/", getAllTeams);
router.get("/standings", getTeamStandingsController);
router.get("/:teamAbv", getTeamByTeamAbv);
router.get("/:teamAbv/roster", getRosterByTeamAbv);
router.get("/:teamAbv/top-performers", getTopPerformers);

export default router;
