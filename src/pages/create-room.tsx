import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsApiResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
  craetedAt: string; 
}>

export function CreateRoom(){
  const { data, isLoading} = useQuery({
    queryKey: ['get-rooms'],  // Identificador para a chamada HTTP
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsApiResponse = await response.json()

      return result
    },
  })

  return(
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
           <div />

           <Card>
             <CardHeader>
              <CardTitle>
                Salas Recentes
              </CardTitle>
              <CardDescription>
                Acesso rápido para as sala criadas recentemente
              </CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col gap-3">
              {data?.map((room) =>{
                return <div 
                key={room.id} 
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
                >
                  <div>
                    <h3 className="font-medium">{room.name}</h3>
                  </div>
                </div>
              })}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
