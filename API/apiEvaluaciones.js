const url = `http://localhost:4000/exams`


export const getAllEvaluaciones = async () => {
    try {
        //relacion con la tabla Skills
        const peticion = await fetch(`${url}?_expand=reclute&_expand=module`);        
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getEvaluacionesById = async (id) => {
    try {
        const peticion = await fetch(`${url}/${id}`);
        const data = await peticion.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addEvaluacion = async (evaluacion) => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(evaluacion),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvaluacion = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateEvaluacion= async (evaluacion) => {
    try {
        await fetch(`${url}/${evaluacion.id}`, {
            method: "PUT",
            body: JSON.stringify(evaluacion),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
}