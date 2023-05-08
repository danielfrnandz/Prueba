import {  getAllModules, getModuleById} from "../API/apiModulos.js";
import { getAllSkills } from "../API/apiSkills.js";

let wsModulos= {

    async showSelectSkills(){
        let data = await getAllSkills();
        let html = ` <option selected disabled>Escoge una skill </option>`;
        
        data.forEach(element => {     
            html += `                      
            <option name="teamId2" value="${element.id}">${element.nameSkill}</option>           `

        });
        return html;
    },

    async showModule(){
        let data = await getAllModules();
        let html = ``;

        data.forEach(element => {           
            html += `   
            <tr>         
            <td>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.skill.nameSkill}</td>            

            <td class="w-25">
                <button type="button" class="btn btn-sm btn-outline-danger delete " data-module="${element.id}">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-warning edit " data-module="${element.id}" data-bs-toggle="modal"
                data-bs-target="#modalUpdateModule">Edit</button>               
            </td>
            
            </tr>`
            ;
        });

        return html;
    },

    async getModById(id){
        const data = await getModuleById(id);
        return data
    },


}

self.addEventListener("message", async (e) => {
    postMessage(await wsModulos[`${e.data.module}`](e.data.data));
});