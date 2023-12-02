import React, { useState } from 'react';
import ComicForm from './comicForm/comicForm';
import ComicDisplay from './comicDisplay/comicDisplay';
import Chat from './chat/chat';
import "./App.css"
import "./comicDisplay/comicDisplay.css"
const App = () => {
  const [comicImages, setComicImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
 
  const generateComic = async (textInput) => {
    try {

      setLoading(true);
      let YOUR_API_KEY ="0e9875b2f009ffbef56afb84863c998832ce6285195f737302c274d726457dbff1e38f363429e8b84127907cd194c753"
      const form = new FormData()
      form.append('prompt', textInput)
      
    const response = await  fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': YOUR_API_KEY,
        },
        body: form,
      })
      console.log(response)
      const result = await response.blob();
      console.log(result)
      const imageUrl = URL.createObjectURL(result);
      console.log(imageUrl)
      setComicImages(imageUrl); 
        // .then(response => {
        //   console.log(response.blob())
        //   response.arrayBuffer()})
        // .then(buffer => {
        //   // buffer here is a binary representation of the returned image
        // })
      // const comicPanelPromises = Array.from({ length: 10 }, async (_, index) => {
      //   const response = await query({ inputs: textInput });
      //   return { image: response, index };
      // });

      // const newComicImages =  Promise.all(comicPanelPromises);await

      // setComicImages([...comicImages, ...newComicImages]);

      // Add the generated comic to the chat
     // setChatMessages([...chatMessages, { text: textInput, images: newComicImages }]);

    } catch (error) {
      console.error('Error generating comic:', error);
      // Handle error and provide user feedback
    }
    finally {
      setLoading(false);
    }
  };  

    const deleteChat = (index) => {
      const updatedChats = [...chatMessages];
      updatedChats.splice(index, 1);
      setChatMessages(updatedChats);
    };
  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: { 
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  return (
    <div className='Main_bg'>
      <div className='cen_div'>
      <h1 className='h1_main'>Comic Generator</h1>
      <ComicForm generateComic={generateComic} />
     
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <ComicDisplay comicImages={comicImages} />
        <img src={comicImages} alt="comic" className='image_generated' />
      )}
      </div>
      
    </div>
  );
};

export default App;



