export const API_URL = import.meta.env.VITE_API_URL;

export async function signUp(data) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
};

export async function login({ data }) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
};

export const updateUser = async (token, updates, userId) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        return response;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

export async function getUser(token) {
    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user data")
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getCustomization() {
    try {
        const response = await fetch(`${API_URL}/api/customization`, {
            method: 'GET',
            cache: 'no-store'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function createCustomization(token, customization) {
    try {
        const response = await fetch(`${API_URL}/api/customization`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customization)
        })
        return response;
    } catch (error) {
        console.error(error)
    }
}

export async function getAllUsers(token) {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getTeam(token, teamId) {
    try {
        const response = await fetch(`${API_URL}/api/users/teams/${teamId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function createVisitor(visitorData, messages) {
    try {
        console.log(visitorData);
        const response = await fetch(`${API_URL}/api/visitors`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            cache: 'no-store',
            body: JSON.stringify({ messages, ...visitorData })
        })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getMessages(visitorId) {
    try {
        const response = await fetch(`${API_URL}/api/chats/${visitorId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getMessagesByTicketId(ticketId, token) {
    try {
        const response = await fetch(`${API_URL}/api/chats/ticket/${ticketId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getTicketsById(userId, token) {
    try {
        const response = await fetch(`${API_URL}/api/tickets/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error(error)
    }
}

export async function getVisitor(visitorId, token) {
    try {
        const response = await fetch(`${API_URL}/api/visitors/${visitorId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function moveTicket(userId, ticketId, token) {
    try {
        const response = await fetch(`${API_URL}/api/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId }) //userId is a string
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export async function updateTicketStatus(ticketId, token, status) {
    try {
        const response = await fetch(`${API_URL}/api/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status }) //userId is a string
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function sendMessage(message) {
    try {
        const response = await fetch(`${API_URL}/api/chats`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });
        return response
    } catch (error) {
        console.error(error);
    }
}

export async function createNewTeamMember(token, teamId, userId, phone, email, designation, teamName) {
    try {
        const response = await fetch(`${API_URL}/api/users/teams/${teamId}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, phone, email, designation, teamName})
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

//teamId, phone, email, designation, adminId, userId, teamName
export async function editTeamMember(token, teamId, userId, adminId, phone, email, designation, teamName) {
    try {
        const response = await fetch(`${API_URL}/api/users/teams/${teamId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, phone, email, designation, teamName, adminId})
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(token, userId) {
    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response;
    } catch (error) {
        console.error(error)
    }
}

export async function updateCustomization(id, token, customization) {
    try {
        const response = await fetch(`${API_URL}/api/customization/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customization)
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getAnalytics(token) {
    try {
        const response = await fetch(`${API_URL}/api/analytics`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}