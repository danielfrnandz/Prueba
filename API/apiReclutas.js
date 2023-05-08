const url = `http://localhost:4000/reclutes`;


export const getAllReclutas = async () => {
    try {
        //relacion con la tabla Teams
        const peticion = await fetch(`${url}?_expand=team`);        
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getReclutaById = async (id) => {
    try {
        const peticion = await fetch(`${url}/${id}`);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addRecluta = async (recluta) => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(recluta),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteRecluta = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateRecluta = async (recluta) => {
    try {
        await fetch(`${url}/${recluta.id}`, {
            method: "PUT",
            body: JSON.stringify(recluta),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
}