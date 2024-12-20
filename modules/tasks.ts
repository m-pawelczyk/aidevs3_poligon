const tasks_config = {
    apiKey : process.env.TASKS_API_KEY,
    token : "",
    url : process.env.TASKS_URL,
}

const centrala_config = {
    apiKey : process.env.TASKS_API_KEY,
    token : "",
    url : process.env.CENTRALA_URL,
}

export const get_token = async (task_name:string) => {
    console.log(tasks_config);
    try {
        const response = await fetch(`${tasks_config.url}token/${task_name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apikey: tasks_config.apiKey
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json() as { token: string };
        console.log("get_token data: ", data);
        tasks_config.token = data.token;
        return data.token;
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
}

export const get_task_data = async (token = tasks_config.token) => {
    try {
        const response = await fetch(`${tasks_config.url}task/${token}`)
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log("get_task_data data: ", data)
        return data;
    } catch (error) {
        console.error("Error fetching task data:", error);
        return null;
    }
}

export const get_token_and_task_data = async (task_name:string) => {
    await get_token(task_name)
    return await get_task_data()
}

export const send_answer = async (answer:any, token = tasks_config.token) => {
    try {
        const response = await fetch(`${tasks_config.url}answer/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answer: answer
            })
        })

        const data = await response.json();
        console.log("send_answer data: ", data)
        return data;
    } catch (error) {
        console.error("Error when sending data:", error);
        return null;
    }
}

// {
//     "task": "identyfikator zadania",
//     "apikey": "Twój klucz API",
//     "answer": "tutaj Twoja odpowiedź"
// }

export const send_answer2 = async (task:String, answer:any, token = tasks_config.apiKey) => {
    try {
        const response = await fetch(`${tasks_config.url}verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task,
                apikey: token,
                answer: answer
            })
        })

        const data = await response.json();
        console.log("send_answer data: ", data)
        return data;
    } catch (error) {
        console.error("Error when sending data:", error);
        return null;
    }
}

export const send_answer3 = async (task:String, answer:any, token = tasks_config.apiKey) => {
    try {
        const response = await fetch(`${centrala_config.url}report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task,
                apikey: token,
                answer: answer
            })
        })

        const data = await response.json();
        console.log("send_answer data: ", data)
        return data;
    } catch (error) {
        console.error("Error when sending data:", error);
        return null;
    }
}


export const get_task_data_using_question = async (token = tasks_config.token, question: string) => {
    try {
        const formData = new FormData();
        formData.append("question", question);

        const response = await fetch(`${tasks_config.url}task/${token}`, {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log("get_task_data_using_question data: ", data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}  