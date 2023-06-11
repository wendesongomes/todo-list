import { Clipboard } from "lucide-react";
import { useState } from "react";

function NoList(){
  return (
    <main className='w-4/5 sm:w-3/5 xl:w-2/5 h-[244px] mt-6 border-t-2 rounded-lg border-gray-400 flex justify-center items-center flex-col'>
        <Clipboard className='text-gray-300' size={80} strokeWidth={0.5} />
        <p className='font-bold text-gray-300 text-base'>Você ainda não tem tarefas cadastradas</p>
        <p className='text-gray-300 text-base'>Crie tarefas e organize seus itens a fazer</p>
    </main>
  )
}

export default NoList