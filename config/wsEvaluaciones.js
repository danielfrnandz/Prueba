import { getAllEvaluaciones, getEvaluacionesById } from "../API/apiEvaluaciones.js";
import { getAllReclutas } from "../API/apiReclutas.js"; 
import { getAllModules } from "../API/apiModulos.js";

let wsEvaluaciones = {
    async showSelectModulos() {
        let data = await getAllModules(); 
        let html = ` <option selected disabled>Escoge un modulo </option>`;

        data.forEach(element => {
            html += `
            <option name="teamId2" value="${element.id}">${element.nombre}</option>           `
        });
        return html;
    },

    async showSelectReclutas() {
        let data = await getAllReclutas();   
        let html = ` <option selected disabled>Escoge un recluta </option>`;
        data.forEach(element => {
            html += `                      
            <option name="" value="${element.id}">${element.nameRecluta}</option>           `
        });
        return html;
    },

    async showEvaluaciones() {
        let data = await getAllEvaluaciones();
        let html = ``;

        data.forEach(element => {
            html += `            
            <tr>         
                <td>${element.reclute.numeroDI}</td>
                <td>${element.reclute.nameRecluta}</td>
                <td>${element.module.nombre}</td>      
                <td>${element.nota}</td>           

                <td class="w-25">
                    <button type="button" class="btn btn-sm btn-outline-danger delete " data-eval="${element.id}">Delete</button>
                    <button type="button" class="btn btn-sm btn-outline-warning edit " data-eval="${element.id}" data-bs-toggle="modal"
                    data-bs-target="#modalUpdateEval">Edit</button>               
                </td>            
            </tr>
            `
        });
        return html;
    },

    async getEvalById(id) {
        const data = await getEvaluacionesById(id);
        return data
    }

}


self.addEventListener("message", async (e) => {
    postMessage(await wsEvaluaciones[`${e.data.module}`](e.data.data));
});