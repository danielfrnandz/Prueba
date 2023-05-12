import { addRecluta, deleteRecluta, updateRecluta } from "../API/apiReclutas.js";

export default {

    showSelect() {
        const ws = new Worker("config/wsReclutas.js", { type: "module" });
        ws.postMessage({
            module: "showSelectTeams",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectTeams").innerHTML = e.data;
            ws.terminate();
        })
    },

    showSelectUpdate() {
        const ws = new Worker("config/wsReclutas.js", { type: "module" });
        ws.postMessage({
            module: "showSelectTeams",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectTeamsUpdate").innerHTML = e.data;
            ws.terminate();
        })
    },


    showSelectQuery() {
        const ws = new Worker("config/wsReclutas.js", { type: "module" });
        ws.postMessage({
            module: "showSelectTeams",
            data: ""
        });        
        ws.addEventListener("message", (e) => {
            document.querySelector("#teamSpecific").innerHTML = e.data;
            ws.terminate();
        })
    },

    
    showFragReclutas() {       
        const ws = new Worker("config/wsReclutas.js", { type: "module" });
        ws.postMessage({
            module: "showReclutas",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector(".tableReclutaContent").innerHTML = e.data;
            ws.terminate();
        })
    },

    //Filtros

    showTeamSpecific(){
        const botonMenores = document.querySelector("#teamSpecific");
        botonMenores.addEventListener("change",(e)=>{
            console.log(`heyCambio ${e.target.value}` );
            
            const ws = new Worker("config/wsReclutas.js", { type: "module" });
            ws.postMessage({
                module: "showReclubyTeamId",
                data: `${e.target.value}`
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableReclutaContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showTodos(){
        const botonTodos = document.querySelector("#todos");
        const selectTeams = document.querySelector("#teamSpecific");

        botonTodos.addEventListener("click",()=>{
            console.log("hey");
            selectTeams.selectedIndex= 0;
            const ws = new Worker("config/wsReclutas.js", { type: "module" });
            ws.postMessage({
                module: "showReclutas",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableReclutaContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showMenores(){
        const botonMenores = document.querySelector("#menores");
        const selectTeams = document.querySelector("#teamSpecific");
        botonMenores.addEventListener("click",()=>{ 
            selectTeams.selectedIndex= 0;
            const ws = new Worker("config/wsReclutas.js", { type: "module" });
            ws.postMessage({
                module: "showMenordeEdad",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableReclutaContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showDosMeses(){
        const botonMenores = document.querySelector("#dosmeses");
        const selectTeams = document.querySelector("#teamSpecific");
        botonMenores.addEventListener("click",()=>{       
            selectTeams.selectedIndex= 0;
            const ws = new Worker("config/wsReclutas.js", { type: "module" });
            ws.postMessage({
                module: "showDosMeses",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableReclutaContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    //----------

    addReclutado() {
        const formularioRecl = document.querySelector("#formRecluta");
        formularioRecl.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await addRecluta(data);
        })
    },
    deleteReclutadera() {
        const reclutadoDelete = document.querySelector(".tableReclutaContent");
        reclutadoDelete.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target.classList.contains("delete")) {
                const id = parseInt(e.target.dataset.recluta);

                if (confirm("Deseas eliminarlo?")) {
                    await deleteRecluta(id);
                }
            }
        })
    },
    updateReclutadera(){
        const reclutadoUpdate = document.querySelector(".tableReclutaContent");
        reclutadoUpdate.addEventListener("click", (e)=>{
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.recluta);
                const ws = new Worker("config/wsReclutas.js",{type:"module"});
                ws.postMessage({module: "getReclubyId", data: id});
                ws.addEventListener("message", (e)=>{
                    showUpdateReclu(e.data);
                    ws.terminate();
                })

                const editarReclut= document.querySelector("#reclutaUpdate");
                editarReclut.addEventListener("submit", async(e)=> {
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    if (confirm("Deseas editarlo?")) {
                        await updateRecluta(data);
                    } 
                })
            }

            function showUpdateReclu(recluta) {
                const inputId = recluta['id'];
                const inputTeamId = recluta['teamId'];
                
                const inputName = recluta['nameRecluta'];
                const inputEdad= recluta['edad'];
           
                const inputTelefono = recluta['telefono'];
                const inputDireccion = recluta['direccion'];
                const inputCorreo = recluta['correo'];
                const inputFechaN = recluta['fechaNac'];
                const inputNumeroID = recluta['numeroDI'];
                const inpuFechaIng = recluta['fechaIng'];
                
                document.querySelector("#selectTeamsUpdate").value = inputTeamId;
                document.querySelector("#idUpdate").value = inputId;
                document.querySelector("#updnameRecluta").value = inputName;
                document.querySelector("#updedad").value = inputEdad;
                document.querySelector("#updtelefono").value = inputTelefono;
                document.querySelector("#updcorreo").value = inputCorreo;
                document.querySelector("#updfechaNac").value = inputFechaN;
                document.querySelector("#updnumeroDI").value = inputNumeroID;
                document.querySelector("#upddireccion").value = inputDireccion;
                document.querySelector("#updfechaIng").value = inpuFechaIng;
               
            }
        })
    }
}