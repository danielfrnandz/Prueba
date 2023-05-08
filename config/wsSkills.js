import {getAllSkills} from "../API/apiSkills.js"

let wsSkills ={
    async showSkills(){
        let data = await getAllSkills();
        let html =``;
        
        data.forEach(element => {
            html+=`
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td class="w-25">
                <button type="button" class="btn btn-sm btn-outline-danger delete data-skill=${element.id}">Delete</button>
                <button type="button" class="btn btn-sm btn-outline-warning edit data-skill=${element.id}">Edit</button>
                <!--    <button type="button" class="btn btn-sm btn-outline-primary">Details</button> -->
            </td>
        </tr>`
        });

        return html;

    }
}

self.addEventListener("message", async (e) => {
    postMessage(await wsSkills[`${e.data.module}`](e.data.data));
});