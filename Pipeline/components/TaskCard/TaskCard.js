import style from "../../src/styles/TaskCard/TaskCard.module.css"
import { useRouter } from "next/router"

export default function TaskCard(props) {
    const router = useRouter();
    const name = localStorage.getItem('name')

    const handleClick = () => {
        debugger
        if(props.isChoice){
            if (name === props.whoCreate){
                router.push({
                    pathname: '/',
                    query: {description: props.description, output: props.output_data, isChoice : props.isChoice, name : name, input: props.input},
                });
            }
        }

        else{
            router.push({
                pathname: '/',
                query: {description: props.description, output: props.output_data, isChoice : props.isChoice, name : name,input: props.input}
            });
        }
       
    };

    return (
        <div className={style.taskCard} onClick={handleClick}>
            <h3>{props.name}</h3>
            <p>Дата создания: {props.date_create}</p>
        </div>
    );
}
