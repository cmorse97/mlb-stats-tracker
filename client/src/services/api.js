import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Get teams from backend
export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}/teams`);
    const teams = await response.data.body;
    return teams;
  } catch (error) {
    console.error("Error fetching teams data from API:", error.message);
    return null;
  }
};

// Get a team by teamAbv from backend
export const fetchTeamByTeamAbv = async (teamAbv) => {
  try {
    const response = await axios.get(`${API_URL}/teams/${teamAbv}`);
    const team = await response.data.body;
    return team;
  } catch (error) {
    console.error("Error fetching team:", error);
    return null;
  }
};

// Get roster by teamAbv from backend
export const fetchRosterByTeamAbv = async (teamAbv) => {
  try {
    const response = await axios.get(`${API_URL}/teams/${teamAbv}/roster`);
    const teamRoster = await response.data.body;
    return teamRoster;
  } catch (error) {
    console.error("Error fetching team roster:", error);
    return null;
  }
};

// Get top performers by teamAbv from backend
export const fetchTopPerformers = async (teamAbv) => {
  try {
    const response = await axios.get(
      `${API_URL}/teams/${teamAbv}/top-performers`
    );
    const performers = await response.data.body;
    return performers;
  } catch (error) {
    console.error("Error fetching top performers", error);
    return null;
  }
};
