import { useState, useEffect, useRef } from 'react';
import style from "@/styles/Input/Input.module.css";
import { useRouter } from 'next/router';
const Inputarea = ({ value, onChange, isChoice}) => {
  debugger
  const [lines, setLines] = useState([]);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const router = useRouter()

    const updateLineNumbers = (text) => {
    const numLines = text.split('\n').length;
    const newLines = Array.from({ length: numLines }, (_, i) => i + 1);
    setLines(newLines);
    debugger
  };

  useEffect(() => {
    updateLineNumbers(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    updateLineNumbers(newValue);
  };

  const syncScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className={style.inputWrapper}>
      <div
        ref={lineNumbersRef}
        className={style.lineNumbers}
        style={{ height: '100%' }}
      >
        {lines.map((line, index) => (
          <div key={index} className={style.lineNumber}>{line}</div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className={style.textarea}
        value={value}
        onChange={handleChange}
        onScroll={syncScroll}
        disabled = {isChoice === 'false'}
      />
    </div>
  );
};

export default Inputarea;
