import {getAllSkills,getById} from "../API/apiSkills.js"

let wsSkills ={
    async showSkills(){
        let data = await getAllSkills();
        let html =``;
        
        data.forEach(element => {
            html+=`
            <tr>
            <td>${element.id}</td>
            <td>${element.nameSkill}</td>
            <td class="w-25">
                <button type="button" class="btn btn-sm btn-outline-danger delete " data-skill="${element.id}">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-warning edit " data-skill="${element.id}" data-bs-toggle="modal"
                data-bs-target="#modalUpdate">Edit</button>              
            </td>
        </tr>`
        });

        return html;
    },

    async getSkillbyId(id){
        const data = await getById(id);
        return data
    }
}


self.addEventListener("message", async (e) => {
    postMessage(await wsSkills[`${e.data.module}`](e.data.data));
});