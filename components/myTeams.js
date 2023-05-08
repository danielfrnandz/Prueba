import { addTeams, deleteTeam, updateTeam } from "../API/apiTeams.js";


export default{
    showTableTeams(){
        console.log("heyTeams");
        const ws = new Worker("config/wsTeams.js",{type:"module"});
        ws.postMessage({
            module: "showTeams",
            data : ""
        });

        ws.addEventListener("message", (e)=>{
            document.querySelector(".tableTeamsContent").innerHTML = e.data;
            ws.terminate();
        })
    },

    addTeams(){
        const formularioTeam = document.querySelector("#formTeam");
        formularioTeam.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            await addTeams(data);
        })
    },
    deleteTeams(){
        const teamDelete = document.querySelector(".tableTeamsContent");
        teamDelete.addEventListener("click", async(e)=>{
            e.preventDefault();
            if (e.target.classList.contains("delete")) {
                const id = parseInt(e.target.dataset.team);
            
                if (confirm("Deseas eliminarlo?")) {
                    await deleteTeam(id);
                } 
            }
        })
    },
    updateTeams(){
        const teamUpdate = document.querySelector(".tableTeamsContent");
        teamUpdate.addEventListener("click", (e)=>{
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.team);
                const ws = new Worker("config/wsTeams.js",{type:"module"});
                ws.postMessage({module: "getTeamsbyId", data: id});
                ws.addEventListener("message", (e)=>{
                    showUpdateTeam(e.data);
                    console.log(e.data);
                    ws.terminate();
                })

                const editarCampo= document.querySelector("#teamUpdate");
                editarCampo.addEventListener("submit", async (e)=>{
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    if (confirm("Deseas editarlo?")) {
                        await updateTeam(data);
                    } 
                })
            }            
        })

        function showUpdateTeam(team) {
            
            const inputId = team['id'];
            const inputName = team['nameTeam'];
            const inputTrainer = team['nameTrainer'];
            document.querySelector("#teamsUpdate").value = inputName;
            document.querySelector("#trainerUpdate").value = inputTrainer;
            document.querySelector("#idUpdateTeam").value = inputId;
        }
    }

    
}