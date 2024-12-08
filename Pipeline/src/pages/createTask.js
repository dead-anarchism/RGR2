import { useState } from "react";
import { Headers } from "../../components/Header/Headers";
import style from "../styles/CreateTask/CreateTask.module.css";
export default function CreateTask() {
    // Состояния для хранения данных из полей textarea
    const [description, setDescription] = useState("");
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState("");
    const [name, setName] = useState("");
    const [isCreate, setIsCreate] = useState(false);

    // Функция для отправки данных
    const handleSubmit = async () => {
        const taskData = {
            description,
            inputData,
            outputData,
            name
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/create_task/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                setDescription('')
                setInputData('')
                setOutputData('')
                setName('')
                setIsCreate(true)
                
            } else {
                console.log("Ошибка при создании задачи");
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    };

    return (
        <div className="backround__item">
            <Headers exit = {true}/>
            {isCreate ? <h3 style={{color:'green', textAlign:'center'}}>Задача создана!</h3> : ''}
            <h1 style={{ textAlign: 'center' }}>Создай задачу!</h1>
            <div className={style.task_input__block}>

                    <div>Введите название</div>
                    <textarea
                        placeholder="Название"
                        style={{width: "90%", height: "75px", padding: '5px', marginLeft: '5px' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <div>Введите описание</div>
                    <textarea
                        placeholder="Описание"
                        style={{width: "90%", height: "75px", padding: '5px', marginLeft: '5px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div>Введите входные данные</div>
                    <textarea
                        placeholder="Входные данные"
                        style={{ width: "90%", height: "75px", padding: '5px', marginLeft: '5px' }}
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />

                    <div>Введите выходные данные</div>
                    <textarea
                        placeholder="Выходные данные"
                        style={{ width: "90%", height: "75px", padding: '5px', marginLeft: '5px' }}
                        value={outputData}
                        onChange={(e) => setOutputData(e.target.value)}
                    />

                    <div style={{ textAlign: "center", marginTop: "70px" }}>
                        <button onClick={handleSubmit}>Отправить</button>
                    </div>
                </div>
            </div>
    );
}
