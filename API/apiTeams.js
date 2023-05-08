const url = `http://localhost:4000/teams`;


export const getAllTeams = async ()=>{
    try {
        const peticion = await fetch(url);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getTeamById = async (id)=>{
    try {
        const peticion = await fetch(`${url}/${id}`);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addTeams = async (team)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(team),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteTeam = async(id) =>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

export const updateTeam = async (team)=>{
    try {
        await fetch(`${url}/${team.id}`,{
            method: "PUT",
            body: JSON.stringify(team),
            headers: {
                "Content-Type":"application/json"
            }
       })
    } catch (error) {
        console.log(error);
    }
}