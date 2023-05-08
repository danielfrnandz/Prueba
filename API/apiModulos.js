const url = `http://localhost:4000/modules`;


export const getAllModules = async () => {
    try {
        //relacion con la tabla Skills
        const peticion = await fetch(`${url}?_expand=skill`);        
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getModuleById = async (id) => {
    try {
        const peticion = await fetch(`${url}/${id}`);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addModule = async (module) => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(module),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteModule = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateModule= async (module) => {
    try {
        await fetch(`${url}/${module.id}`, {
            method: "PUT",
            body: JSON.stringify(module),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
}