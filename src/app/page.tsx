'use client'

import Image from 'next/image'
import logo from '../assets/logo.svg'
import { Inter } from 'next/font/google';
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { CheckCircleIcon, Circle, Trash } from 'lucide-react';
import { Checkbox } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import NoList from './components/noList';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [tasks, setTasks] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [listTasks, setListTasks] = useState<any[]>([])
  
  const countComplet = listTasks.filter(item => item.isComplete === true).length
  const countCreate = listTasks.filter(item => item).length
  
  const HandleDeleteTask = (key: React.Key) => {
    const updateListTasks = listTasks.filter(item => item.id !== key)
    setListTasks(updateListTasks)
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTasks(event.target.value)
  
    event.target.value == ''
  }
  
  const isComplete = listTasks.map((item) => {
    return (
      <div key={item.id} className="flex items-start justify-between m-3 bg-gray-500 p-4 rounded-lg">
        <div className='flex items-start'>
          <Checkbox style={{ color: '#5E60CE', transform: 'scale(0.8)', padding: '1px'}} icon={<Circle />} checkedIcon={<CheckCircleIcon />} checked={item.isComplete} onChange={(event) => HandleCheckboxChange(event, item.id)}/>
          { item.isComplete ? <p className="text-gray-300 text-sm px-3 line-through">{item.text}</p> : <p className="text-gray-100 text-sm px-3">{item.text}</p>}
        </div>
        <button className="mt-1" onClick={() => HandleDeleteTask(item.id)}><Trash className="text-gray-300" size={13}/></button>
      </div>
    )
  }) 
  
  const HandleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: String) => {
    const updateItems = listTasks.map((task) => {
      if(task.id === taskId){
        return {...task, isComplete: event.target.checked}
      }
      return task
    })
  
    setListTasks(updateItems)
  }
  
  function HandleClick(event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>){
    event.preventDefault()
  
    if(tasks != ''){
      setListTasks([...listTasks, {
        text: tasks,
        isComplete: false,
        id: uuidv4(),
      }])
  
      setTasks('')
    }
  }


  return (
    <div className={`${inter.className} w-screen h-screen flex items-center flex-col overflow-x-hidden`}>

      <header className='w-screen h-[200px] bg-gray-700 flex flex-col justify-center items-center gap-10'>
        <div className='flex items-center justify-center mt-28'>
          <Image src={logo} width={126} height={48} alt=''></Image>
        </div>
        <form onSubmit={HandleClick} className='w-4/5 sm:w-3/5 xl:w-2/5'>
          <input value={tasks} onChange={handleChange} className='text-white w-10/12 rounded-[8px] h-[54px] p-4 m-2 border-solid border-gray-700 bg-gray-500 placeholder:text-gray-300 outline-none' type="text" placeholder='Adicione uma nova tarefa'/>
          <button type='submit' onClick={HandleClick} className='bg-blue-dark text-gray-100 w-1/12 h-[52px] rounded-[8px] font-bold text-sm'>Criar </button>
        </form>
      </header>

      <div className='flex mt-24 w-4/5 sm:w-3/5 xl:w-2/5  justify-between'>
        <div className='flex gap-[8px]'>
          <p className='text-blue-light font-bold text-sm'>Tarefas criadas</p>
          <span className='text-white font-bold text-sm bg-gray-400 py-[1px] px-2 rounded-[10px]'>{countCreate}</span>
        </div>

        <div className='flex gap-[8px]'>
          <p className='text-purple-light font-bold text-sm'>Concluidas</p>
          {countComplet === 0 ? <span className='text-white font-bold text-sm bg-gray-400 py-[1px] px-2 rounded-[10px]'>{countComplet}</span> :  
                                <span className='text-white font-bold text-sm bg-gray-400 py-[1px] px-2 rounded-[10px]'>{countComplet} de {countCreate}</span>}
        </div>
      </div>

      {listTasks.length === 0 ? <NoList /> : <main className='w-4/5 sm:w-3/5 xl:w-2/5  mt-6 flex flex-col-reverse'> {isComplete} </main>}

    </div>
  )
}
