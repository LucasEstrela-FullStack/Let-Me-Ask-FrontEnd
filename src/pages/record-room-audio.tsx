import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported = 
  !!navigator.mediaDevices && 
  typeof navigator.mediaDevices.getUserMedia === 'function' && 
  typeof window.MediaRecorder === 'function';


  type RoomParams = {
    roomId: string
  } 

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef <MediaRecorder | null>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    // Aqui você pode processar os dados gravados, por exemplo, enviando para um servidor (aplicattion/multipart/form-data)
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    console.log('Resposta do servidor:', result)
  }
  
  async function startRecording() {
    if(!isRecordingSupported) {
      return alert('Gravação de áudio não é suportada neste navegador.')  
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: true, // Cancelamento de eco
            noiseSuppression: true, // Supressão de ruído
            sampleRate: 44_100, // Taxa de amostragem
        },
    });

    recorder.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm', // Formato de áudio
        audioBitsPerSecond: 64_000, // Taxa de bits do áudio
    })

    recorder.current.ondataavailable = (event) => {
      if(event.data.size > 0) {
       console.log('Dados de áudio gravados:', event.data)
       uploadAudio(event.data); // Envia os dados gravados para o servidor
       // Aqui você pode enviar os dados para o servidor ou processá-los conforme necessário
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada')
      setIsRecording(false);
    }

    recorder.current.start()
  }

  if(!params.roomId) {
    return <Navigate replace to="/" />
  }

  return(
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
        {isRecording ? (
          <Button onClick={stopRecording} >Pausar Gravação de Aúdio</Button>
        ) : (
          <Button onClick={startRecording} >Iniciar Gravar Aúdio</Button>
        )}
        {isRecording ?<p>Gravando...</p>: <p>Pressione o botão para gravar áudio</p> }
    </div>
  )
}