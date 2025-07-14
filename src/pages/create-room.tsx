import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dayjs } from '@/lib/dayjs';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
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
                return ( 
                <Link 
                key={room.id}
                to={'/rooms/${room.id}'} 
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
                >

                  <div className="flex-1 flex-col gap-1">
                    <h3 className="font-medium">{room.name}</h3>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {dayjs(room.craetedAt).toNow()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {room.questionsCount} Pergunta(s)
                      </Badge>
                    </div>
                  </div>

                <span className="flex items-center gap-2 text-sm">
                  Entrar
                  <ArrowRight className="size-3"/>
                </span>
                </Link>
              )})}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
