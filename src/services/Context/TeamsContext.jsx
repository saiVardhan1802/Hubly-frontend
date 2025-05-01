import React, { useContext, useEffect, useReducer } from "react"
import { getAllUsers, getMessages, getTeam } from "..";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const TeamsContext = React.createContext();
export const DispatchTeamsContext = React.createContext();

export const useTeams = () => useContext(TeamsContext);
export const useTeamsDispatch = () => useContext(DispatchTeamsContext);

const initialState = {}

const ACTIONS = {
    SET_TEAMS : 'set teams',
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_TEAMS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

const TeamsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const token = localStorage.getItem('token');

    const user = useContext(UserContext);

    useEffect(() => {
        try {
            async function fetchAllUsers(token) {
                let response;
                if (user.role === 'super-admin') {
                    response = await getAllUsers(token);
                }
                else {
                    response = await getTeam(token, user.team.teamId);
                }
                if (!response.ok) {
                    // toast.error("Failed to fetch the team. Please try again.")
                    return;
                }
                const users = await response.json();
                const teams = segregateUsersByTeams(users);
                dispatch({ type: ACTIONS.SET_TEAMS, payload: teams });
            }
            fetchAllUsers(token);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => console.log(state), [state]);
    useEffect(() => console.log('current user: \n', user), [user]);

    return (
        <TeamsContext.Provider value={state}>
            <DispatchTeamsContext.Provider value={dispatch}>
                {children}
            </DispatchTeamsContext.Provider>
        </TeamsContext.Provider>
    )
}

function segregateUsersByTeams(users) {
    const teamMap = new Map();
    let superAdminTeamId = null;
  
    users.forEach(user => {
      const { team, role } = user;
  
      if (!teamMap.has(team.teamId)) {
        teamMap.set(team.teamId, {
          teamId: team.teamId,
          teamName: team.name,
          users: []
        });
      }
  
      // Check if this user is the super-admin, remember their teamId
      if (role === 'super-admin') {
        superAdminTeamId = team.teamId;
      }
  
      teamMap.get(team.teamId).users.push(user);
    });
  
    // Sort users within each team: admin or super-admin first
    teamMap.forEach(team => {
      team.users.sort((a, b) => {
        const priority = a.role === 'super-admin' || a.role === 'admin' ? 0 : 1;
        const bPriority = b.role === 'super-admin' || b.role === 'admin' ? 0 : 1;
        return priority - bPriority;
      });
    });
  
    // Convert to array and move super-admin team to the top
    const teamsArray = Array.from(teamMap.values());
  
    teamsArray.sort((a, b) => {
      if (a.teamId === superAdminTeamId) return -1;
      if (b.teamId === superAdminTeamId) return 1;
      return 0;
    });
  
    return teamsArray;
};  

export default TeamsContextProvider;