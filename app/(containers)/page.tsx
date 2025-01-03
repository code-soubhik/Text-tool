// app/(containers)/page.tsx
"use client"
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, use } from 'react';
import { toast } from 'react-toastify';

type DataSchema = {
  id: number;
  data: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const query = use(searchParams);
  const isEditParamsExists = query && typeof query.edit === 'string' && query.edit === "true";

  const [text, setText] = useState<string>('Nothing to preview..');
  const [wordCount, setWordCount] = useState(0);
  const [timeTaken, setTimeTaken] = useState<string>("0");
  const [textID, setTextID] = useState<string | null>(null);
  const textBoxValue = useRef<HTMLTextAreaElement>(null);

  const router = useRouter()

  useEffect(() => {
    if (isEditParamsExists) {
      const editId = window.localStorage.getItem("editId");
      if (!editId) router.push("/");
      setTextID(editId)
      const textData = window.localStorage.getItem("data");
      const text = textData ? JSON.parse(textData).filter((item: DataSchema) => item.id === Number(editId))[0] : null;
      handleChange(text.data)
      if (textBoxValue?.current)
        textBoxValue.current.value = text.data;
    }
  })

  const handleChange = (val: string) => {
    if (val === "") {
      setText("Nothing to preview..");
    } else {
      setText(val);
    }
    const words = val.split(" ").filter(el => el !== "");
    const readingTime = (words.length / 200).toFixed(2);
    setWordCount(words.length);
    setTimeTaken(readingTime);
  };

  const handleUppercase = () => {
    if (textBoxValue?.current?.value && textBoxValue.current.value !== "") {
      const newData = text.toUpperCase();
      textBoxValue.current.value = newData;
      setText(newData);
    } else {
      toast("Input is empty!");
    }
  };

  const handleLowercase = () => {
    if (textBoxValue?.current?.value && textBoxValue.current.value !== "") {
      const newData = text.toLowerCase();
      textBoxValue.current.value = newData;
      setText(newData);
    } else {
      toast("Input is empty!");
    }
  };

  const handleCopy = () => {
    if (textBoxValue?.current?.value && textBoxValue.current.value !== "") {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast("Text copied.");
        })
        .catch(() => {
          toast("Failed to copy text.");
        });
    } else {
      toast("Input is empty!");
    }
  };

  const handleExtraSpace = () => {
    if (textBoxValue?.current?.value && textBoxValue.current.value !== "") {
      const newText = text.split(" ").filter(el => el !== "").join(" ");
      textBoxValue.current.value = newText;
      setText(newText);
    } else {
      toast("Input is empty!");
    }
  };

  const handleClearing = () => {
    if (!textBoxValue?.current?.value || textBoxValue.current.value === "")
      return;
    textBoxValue.current.value = "";
    setText('Nothing to preview..');
    return;
  };

  const handleSave = () => {
    try {
      if (!textBoxValue?.current?.value || textBoxValue.current.value === "")
        return toast("Input is empty!");
      const storedData = window.localStorage.getItem("data");
      const data: DataSchema[] = storedData ? JSON.parse(storedData) : [];

      const dataExists = (text: string) => data.some(item => item.data === text);

      if (dataExists(text)) {
        return toast("Data already saved!");
      }

      if (textID !== null) {
        const id = parseInt(textID);
        data.forEach(item => {
          if (item.id === id) {
            item.data = text;
            item.updatedAt = new Date().toLocaleString();
          }
        });
      }
      else {
        const id = Math.floor(Math.random() * 10000000000);
        const schema = {
          id,
          data: text,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        };
        data.push(schema);
      }
      window.localStorage.setItem("data", JSON.stringify(data));
      handleClearing();
      if (isEditParamsExists)
        router.push("/");
      toast("Text saved successfully!");
    } catch (error) {
      toast("Failed to save text!");
      console.error(error);
    }
    finally {
      window.localStorage.removeItem("editId");
    }
  };

  return (
    <div className="container">
      <div className="main">
        <div className="section">
          <div className="data-input">
            <h1 className='heading1'>{isEditParamsExists ? "Edited text to analyze below" : "Enter the text to analyze below"}</h1>
            {isEditParamsExists && <span className='edit-note'>Note: Editing the text will not update the saved text.</span>}
            <textarea
              ref={textBoxValue}
              className="text-box"
              placeholder="Enter the text"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="card">
            <h2 className="summary">Summary</h2>
            <div className="card-data">Words: {text !== 'Nothing to preview..' ? wordCount : 0}</div>
            <div className="card-data">Characters: {text !== 'Nothing to preview..' ? text.length : 0}</div>
            <div className="card-data">Reading Time: {text !== 'Nothing to preview..' ? timeTaken : 0} min</div>

          </div>
        </div>
        <div className="btn-container">
          <button className='btn' onClick={handleUppercase}>Convert To Uppercase</button>
          <button className='btn' onClick={handleLowercase}>Convert To Lowercase</button>
          <button className='btn' onClick={handleCopy}>Copy To Clipboard</button>
          <button className='btn' onClick={handleExtraSpace}>Clear Extra Spaces</button>
          <button className='btn' onClick={handleClearing}>Clear Text</button>
          <button className='btn' onClick={handleSave}>Save</button>
        </div>
        <div className="preview">
          <h3 className='preview-heading'>Preview</h3>
          <pre className="data">{text}</pre>
        </div>
      </div>
    </div>
  );
}
