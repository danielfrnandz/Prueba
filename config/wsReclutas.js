import {  getAllReclutas, getReclutaById} from "../API/apiReclutas.js";
import { getAllTeams } from "../API/apiTeams.js";

let wsReclutas ={  

    async showReclutas(){
        let data = await getAllReclutas();
        let html = ``;    
                  
        data.forEach(element => {                
            console.log(element);
            html +=`
            <tr>
            <td>${element.numeroDI}</td>
            <td>${element.nameRecluta}</td>            
            <td>${element.edad}</td>
            <td>${element.telefono}</td>
            <td>${element.correo}</td>
            <td>${element.direccion}</td>
            <td>${element.team.nameTeam}</td>
            <td>${element.fechaIng}</td>

            <td class="w-25">
                <button type="button" class="btn btn-sm btn-outline-danger delete " data-recluta="${element.id}">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-warning edit " data-recluta="${element.id}" data-bs-toggle="modal"
                data-bs-target="#modalUpdateRecluta">Edit</button>               
            </td>
            </tr>
            `;            
        });
        
        return html;
       
    },

    async getReclubyId(id){
        const data = await getReclutaById(id);
        return data
    },


    async showSelectTeams(){
        let data = await getAllTeams();
        let html = ` <option selected disabled>Escoge un team</option>`;
        
        data.forEach(element => {
     
            html += `                      
            <option name="teamId2" value="${element.id}">${element.nameTeam}</option>
            `

        });
        return html;
    },


}

self.addEventListener("message", async (e) => {
    postMessage(await wsReclutas[`${e.data.module}`](e.data.data));
});