import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomResquest } from "./types/create-rooms-request";
import type { CreateRoomResponse } from "./types/create-room-reponse";

export function useCreateRoom(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateRoomResquest) => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result: CreateRoomResponse = await response.json()

      return result
    },

    onSuccess:() =>{
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  });
}