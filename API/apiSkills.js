const url = `http://localhost:4000/skills`;



export const getAllSkills = async ()=>{
    try {
        const peticion = await fetch(url);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addSkill = async (skill)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(skill),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteSkill = async(id) =>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

export const updateOneCategory = async (skill)=>{
    try {
        await fetch(`${url}/${skill.id}`,{
            method: "PUT",
            body: JSON.stringify(skill),
            headers: {
                "Content-Type":"application/json"
            }
       })
    } catch (error) {
        console.log(error);
    }
}