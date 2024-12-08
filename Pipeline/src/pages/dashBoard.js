import { Headers } from "../../components/Header/Headers";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import style from "../styles/dashBoard/dashBoard.module.css";

export default function DashBoard() {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAdmin(localStorage.getItem('isAdmin'));
            setName(localStorage.getItem('name'));
        }
        fetch("http://127.0.0.1:8000/create_task/") 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные');
                }
                return response.json(); 
            })
            .then((data) => {
                setTasks(data.tasks);
            })
            .catch((error) => {
                console.log(error.message); 
            });
    }, []);

    const handleClick = () => {
        router.push({
            pathname: '/createTask/',
        });
    };

    return (
        <div className="background__item">
            <Headers exit={true} />
            
            <div style={{display: 'flex', justifyContent: 'end', marginBottom: '20px'}}>
                {isAdmin === 'true' ? (
                    <button className={style.add_task__btn} onClick={handleClick}>Добавить задачу</button>
                ) : (
                    <span>Вы не являетесь администратором</span>
                )}
            </div>

            <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Задачи</h1>

            <div style={{display: 'flex', width: '100%'}}>
                {/* Левая часть с задачами */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h3>Нужно сделать</h3>
                    {/* Отображение карточек задач, которые еще не выбраны */}
                    {tasks.map((task) => (
                        !task.is_choice ? (
                            <div key={task.id} style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                                <TaskCard
                                    name = {task.name}
                                    input={task.input_data}
                                    isChoice={task.is_choice}
                                    date_create={task.date_create}
                                    description={task.description}
                                    output_data={task.output_data}
                                />
                            </div>
                        ) : null
                    ))}
                </div>

                {/* Правая часть с выполняющимися задачами */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h3>Выполняются</h3>
                    {/* Отображение карточек задач, которые выбраны */}
                    {tasks.map((task) => (
                        task.is_choice ? (
                            <div key={task.id} style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                                <TaskCard
                                    name = {task.name}
                                    input={task.input_data}
                                    whoCreate={task.whoCreate}
                                    isChoice={task.is_choice}
                                    date_create={task.date_create}
                                    description={task.description}
                                    output_data={task.output_data}
                                />
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}
