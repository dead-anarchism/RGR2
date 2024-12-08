import { wrapper } from '../../store';
import { setMessage } from '../../store';
import { Headers } from "../../components/Header/Headers";
import Inputarea from '../../components/Inputarea/Inputarea';
import { useState, useEffect} from 'react';
import style from "../styles/Home/Home.module.css"
import MenuInput from '../../components/MenuInput/MenuInput';
import OutputArea from '../../components/OutputArea/OutputArea';
import { useRouter } from 'next/router';

const Index = () => {
  const [code, setCode] = useState("print(\"Hello world\")\n");
  const [data,setData] = useState("");
  const router = useRouter();
  const {description, output, isChoice, name, input} = router.query; 
  debugger
  const [choice, setChoice] = useState(isChoice)
  useEffect(() => {
    debugger
    if (typeof window !== 'undefined' && localStorage.getItem('isAuth') === 'false') {
      router.push("/Login/")
  }
    }, []);



  async function handleSubmit(code) {
    console.log("Submitting code:", code);
    try {
        const response = await fetch('http://127.0.0.1:8000/compile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });
        if (!response.ok) {
          const datt = await response.json();
          setData(datt.error);
        }
        else{
          debugger
          const dat = await response.json();
          console.log('Server response:', dat);
          setData(dat.output);
          setChoice(true)
        }
        
    } catch (error) {
        console.error('Error submitting code:', error);
    }
}

async function handleTakeToWork() {
  try {
    debugger
      const response = await fetch('http://127.0.0.1:8000/Update_choice/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, name}),
      });
      if (!response.ok) {
        const datt = await response.json();
        setData(datt.error);
      }

      else{
        debugger
        setChoice(true)
      }
      
  } catch (error) {
      console.error('Error submitting code:', error);
  }
}

async function handlePass(){

  try {
    const response = await fetch('http://127.0.0.1:8000/create_task/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });
    if (response.ok) {
      debugger
      router.push('/dashBoard/')
    }
    else{
      debugger
      const dt = await response.json();
      console.log('Server response:', dt.error);
    }
    
    } catch (error) {
        console.error('Error submitting code:', error);
    }
}

  return (
    <>
      <div className="backround__item">
        <Headers />
        <button onClick={handleTakeToWork}>take to work</button>
        <div className={style.align_block__main}>
        <section className={style.input__section}>
          <MenuInput handleSubmit={handleSubmit} code={code} setCode={setCode}></MenuInput>
          <div style={{display:"flex", marginBottom:"25px", whiteSpace:"nowrap", border:"1px solid #000", background:"#fff",justifyContent:"center",alignItems:"center",borderRadius:"20px", padding:'10px'}}>{description}</div>
            <div style={{textAlign:'left'}}>{`input: ${input}`}</div>
            <div>{`output: ${output}`}</div>
          <Inputarea value={code} onChange={setCode} isChoice = {choice}/>
          <OutputArea response={data}></OutputArea>
          {data === output ? <button style={{display:"flex", marginTop:"25px",justifyContent:"center",width:"120px",alignItems:"center",height:"190px",background:"green",cursor:"pointer",borderRadius:"20px"}} onClick={handlePass}>Сдать</button>:''}
        </section>
      </div>
    </div>
    </>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const fetchedMessage = 'Hello from Server Side!';
    store.dispatch(setMessage(fetchedMessage));

    return {
      props: {
        message: fetchedMessage,
      },
    };
  }
);
