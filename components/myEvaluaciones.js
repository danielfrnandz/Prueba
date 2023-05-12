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
    showSelectRecluta(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showSelectReclutas",
                data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectReclutes").innerHTML = e.data;
            ws.terminate();
        })
    },

    showEvaluaciones(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showEvaluaciones",
                data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector(".tableSkillsContent").innerHTML = e.data;
            ws.terminate();
        })
    },


}