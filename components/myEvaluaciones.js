import { addEvaluacion,deleteEvaluacion,updateEvaluacion } from "../API/apiEvaluaciones.js";

export default{

showSelectSkill(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
        ws.postMessage({
            module: "showSelectModulos",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectModules").innerHTML = e.data;
            ws.terminate();
        })
    },


}