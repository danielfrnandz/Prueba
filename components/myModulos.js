import { addModule, deleteModule, updateModule } from "../API/apiModulos.js";

export default{
    showSelectSkill(){
        const ws = new Worker("config/wsModulos.js", { type: "module" });
        ws.postMessage({
            module: "showSelectSkills",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectSkills").innerHTML = e.data;
            ws.terminate();
        })
    },

    showSelectSkillUpdate(){
        const ws = new Worker("config/wsModulos.js", { type: "module" });
        ws.postMessage({
            module: "showSelectSkills",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#selectSkillsUpdate").innerHTML = e.data;
            ws.terminate();
        })
    },    

    showSelectSkillSpecific(){
        const ws = new Worker("config/wsModulos.js", { type: "module" });
        ws.postMessage({
            module: "showSelectSkills",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector("#skillSpecific").innerHTML = e.data;
            ws.terminate();
        })
    },

    showSkillSpecific(){
        const botonMenores = document.querySelector("#skillSpecific");
        botonMenores.addEventListener("change",(e)=>{
            console.log(`heyCambio ${e.target.value}` );
            
            const ws = new Worker("config/wsModulos.js", { type: "module" });
            ws.postMessage({
                module: "showModulebySkill",
                data: `${e.target.value}`
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableModulesContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },

    showTodos(){
        const botonTodos = document.querySelector("#todos");
        const selectSkills = document.querySelector("#skillSpecific");

        botonTodos.addEventListener("click",()=>{
            console.log("hey");
            selectSkills.selectedIndex= 0;
            const ws = new Worker("config/wsModulos.js", { type: "module" });
            ws.postMessage({
                module: "showModule",
                data: ""
            });
            ws.addEventListener("message", (e) => {
                document.querySelector(".tableModulesContent").innerHTML = e.data;
                ws.terminate();
            })
        })
    },


    showFragModule(){       
        const ws = new Worker("config/wsModulos.js", { type: "module" });
        ws.postMessage({
            module: "showModule",
            data: ""
        });
        ws.addEventListener("message", (e) => {
            document.querySelector(".tableModulesContent").innerHTML = e.data;
            ws.terminate();
        })
    },

    addModulo(){
        const formularioRecl = document.querySelector("#formModulo");
        formularioRecl.addEventListener("submit",async (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await addModule(data);
        })       
    },

    deleteModulos(){
        const moduloDelete = document.querySelector(".tableModulesContent");
        moduloDelete.addEventListener("click", async(e)=> {
            e.preventDefault();
            if (e.target.classList.contains("delete")) {
                const id = parseInt(e.target.dataset.module);
            
                if (confirm("Deseas eliminarlo?")) {
                    await deleteModule(id);
                } 
            }
        })
    },

    updateModulos(){
        const moduloUpdate= document.querySelector(".tableModulesContent");

        moduloUpdate.addEventListener("click", (e)=>{
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.module);
                console.log(id);
                const ws = new Worker("config/wsModulos.js",{type:"module"});
                ws.postMessage({module: "getModById", data: id});
                ws.addEventListener("message", (e)=>{
                    showUpdateModule(e.data);
                    ws.terminate();
                })

                const editarCampo= document.querySelector("#moduleUpdate");
                editarCampo.addEventListener("submit", async (e)=>{
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    if (confirm("Deseas editarlo?")) {
                        await updateModule(data);
                    } 
                })
            }
        })


        function showUpdateModule(modulo) {
            const inputId = modulo['id'];
            const inputSkillId = modulo['skillId'];
            const inputName = modulo['nombre'];

            document.querySelector("#selectSkillsUpdate").value = inputSkillId;            
            document.querySelector("#updnameModulo").value = inputName;
            document.querySelector("#idUpdate").value = inputId;
        }        
    }




}