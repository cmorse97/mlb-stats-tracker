import cron from "node-cron";
import {
  fetchAllPlayers,
  storePlayersInSupabase,
} from "../models/playerModel.js";
import { fetchTeams, storeTeamsInSupabase } from "../models/teamModel.js";

export const updatePlayers = () => {
  try {
    cron.schedule(
      "* 1 * * *", // Update once per hour
      async () => {
        console.log("Running scheduled job to update players data...");
        const players = await fetchAllPlayers();
        await storePlayersInSupabase(players);
        console.log("Players data updated successfully");
      },
      {
        scheduled: true,
        timeZone: "America/New_York",
      }
    );
  } catch (err) {
    console.error("Failed to update players data:", err);
  }
};

export const updateTeams = () => {
  try {
    cron.schedule(
      "* 1 * * *", // Update once per hour
      async () => {
        console.log("Running scheduled job to update teams data...");
        const teams = await fetchTeams();
        await storeTeamsInSupabase(teams);
        console.log("Teams data updated successfully");
      },
      {
        scheduled: true,
        timeZone: "America/New_York",
      }
    );
  } catch (err) {
    console.error("Failed to update teams data:", err);
  }
};
