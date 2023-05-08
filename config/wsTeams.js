import { getAllTeams, getTeamById } from "../API/apiTeams.js";

let wsTeams ={
    async showTeams(){
        let data = await getAllTeams();
        let html = ``;

        data.forEach(element => {
            html +=`
            <tr>
            <td>${element.id}</td>
            <td>${element.nameTeam}</td>
            <td>${element.nameTrainer}</td>
            <td class="w-25">
                <button type="button" class="btn btn-sm btn-outline-danger delete " data-team="${element.id}">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-warning edit " data-team="${element.id}" data-bs-toggle="modal"
                data-bs-target="#modalUpdateTeams">Edit</button>              
            </td>
            </tr>
            `
        });

        return html;

    },



    
    async getTeamsbyId(id){
        const data = await getTeamById(id);
        return data
    }
}

self.addEventListener("message", async (e) => {
    postMessage(await wsTeams[`${e.data.module}`](e.data.data));
});
