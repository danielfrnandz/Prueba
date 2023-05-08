import { addSkill,deleteSkill,updateSkill } from "../API/apiSkills.js";

export default{
    showTableSkills(){
        console.log("hey");
        const ws = new Worker("config/wsSkills.js",{type:"module"});
        ws.postMessage({
            module: "showSkills",
            data : ""
        });
        ws.addEventListener("message", (e)=>{
            document.querySelector(".tableSkillsContent").innerHTML = e.data;
            ws.terminate();
        })
    },

    addSkills(){
        const formulario = document.querySelector("#formSkill");
        formulario.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await addSkill(data);            
        })        
    }, 
    deleteSkills(){
        const campoDelete= document.querySelector(".tableSkillsContent");
        campoDelete.addEventListener("click", async (e)=> {
            e.preventDefault();
            if (e.target.classList.contains("delete")) {
                const id = parseInt(e.target.dataset.skill);
            
                if (confirm("Deseas eliminarlo?")) {
                    await deleteSkill(id);
                } 
            }
        })
    },

    updateSkills(){
        const campoUpdate= document.querySelector(".tableSkillsContent");
        campoUpdate.addEventListener("click", (e)=>{
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.skill);
                const ws = new Worker("config/wsSkills.js",{type:"module"});
                ws.postMessage({module: "getSkillbyId", data: id});
                ws.addEventListener("message", (e)=>{
                    showUpdateSkill(e.data);
                    ws.terminate();
                })

                const editarCampo= document.querySelector("#skillUpdate");
                editarCampo.addEventListener("submit", async (e)=>{
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    if (confirm("Deseas editarlo?")) {
                        await updateSkill(data);
                    } 
                })
            }
        })


        function showUpdateSkill(skill) {
            const inputId = skill['id'];
            const inputName = skill['nameSkill'];
            document.querySelector("#nameUpdate").value = inputName;
            document.querySelector("#idUpdate").value = inputId;
        }

    }
}