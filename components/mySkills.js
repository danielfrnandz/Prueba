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
    }
}