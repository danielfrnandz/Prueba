import { addEvaluacion,deleteEvaluacion,updateEvaluacion } from "../API/apiEvaluaciones.js";

export default{
    //Select para Modulos
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

    showSelectSkillUpdate(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showSelectModulos",
                data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#updselectModules").innerHTML = e.data;
            ws.terminate();
        })
    },


    //Select para Reclutas
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

    showSelectRecluteUpdate(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showSelectReclutas",
                data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#updselectReclutes").innerHTML = e.data;
            ws.terminate();
        })
    },

    showSelectRecluteFilter(){
        const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showSelectReclutas",
                data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#reclutaSpecific").innerHTML = e.data;
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
            document.querySelector(".tableEvaluaciones").innerHTML = e.data;
            ws.terminate();
        })
    },

    showTodos(){
        const botonTodos = document.querySelector("#todos");
        const selectRecluta = document.querySelector("#reclutaSpecific");

        botonTodos.addEventListener("click",()=>{
            console.log("hey");
            selectRecluta.selectedIndex= 0; 
            const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showEvaluaciones",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableEvaluaciones").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showPerdidos(){
        const botonPerdidos = document.querySelector("#perdidos");
         const selectRecluta = document.querySelector("#reclutaSpecific"); 
        botonPerdidos.addEventListener("click",()=>{ 
           selectRecluta.selectedIndex= 0;
            const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showEvaluacionesPerdidas",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableEvaluaciones").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showReclutaSpecific(){
        const selectRecluta = document.querySelector("#reclutaSpecific");
        selectRecluta.addEventListener("change",(e)=>{
            console.log(`heyCambio ${e.target.value}` );

            const ws = new Worker("config/wsEvaluaciones.js", { type: "module" });
            ws.postMessage({
                module: "showEvaluacionbyReclutaId",
                data: `${e.target.value}`
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableEvaluaciones").innerHTML = e.data;
                ws.terminate();
            })
        })
    },



    addEvaluaciones() {
        const formularioRecl = document.querySelector("#formEvaluacion");
        formularioRecl.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await addEvaluacion(data);
        })
    },

    deleteEvaluaciones() {
        const reclutadoDelete = document.querySelector(".tableEvaluaciones");
        reclutadoDelete.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target.classList.contains("delete")) {
                const id = parseInt(e.target.dataset.eval);

                if (confirm("Deseas eliminarlo?")) {
                    await deleteEvaluacion(id);
                }
            }
        })
    },
    updateEvualaciones(){
        const reclutadoUpdate = document.querySelector(".tableEvaluaciones");
        reclutadoUpdate.addEventListener("click", (e)=>{
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.eval);
                const ws = new Worker("config/wsEvaluaciones.js",{type:"module"});
                ws.postMessage({module: "getEvalById", data: id});
                ws.addEventListener("message", (e)=>{
                    showUpdateEvaluaciones(e.data);
                    ws.terminate();
                })

                const editarEvaluacion= document.querySelector("#evalUpdate");
                editarEvaluacion.addEventListener("submit", async(e)=> {
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    if (confirm("Deseas editarlo?")) {
                        await updateEvaluacion(data);
                    } 
                })
            }

            function showUpdateEvaluaciones(evaluacion) {
                const inputId = evaluacion['id'];
                const inputIdModulo = evaluacion['moduleId'];
                const inputIdRecluta= evaluacion['recluteId'];
                const inputNota = evaluacion['nota'];

                document.querySelector("#idEvalUpdate").value = inputId;
                document.querySelector("#updselectModules").value = inputIdModulo;
                document.querySelector("#updselectReclutes").value = inputIdRecluta;
                document.querySelector("#updnota").value = inputNota;

            }
        })
    }


}