'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export default function TodoList() {
  const { user } = useUser()
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`todos-${user.id}`)
      if (saved) {
        setTodos(JSON.parse(saved))
      }
    }
  }, [user])

  useEffect(() => {
    if (user && todos.length > 0) {
      localStorage.setItem(`todos-${user.id}`, JSON.stringify(todos))
    }
  }, [todos, user])

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        createdAt: Date.now(),
      }
      setTodos([newTodo, ...todos])
      setInputValue('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="glass-effect rounded-3xl p-6 md:p-8">
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-6 py-4 rounded-2xl glass-effect text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500 transition-all"
        />
        <button
          onClick={addTodo}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <p className="text-lg">No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="glass-effect rounded-2xl p-5 flex items-center gap-4 group hover:scale-[1.02] transition-all"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-pink-500'
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              
              <span
                className={`flex-1 text-lg transition-all ${
                  todo.completed
                    ? 'text-gray-400 dark:text-gray-500 line-through'
                    : ''
                }`}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {todos.filter(t => !t.completed).length} task{todos.filter(t => !t.completed).length !== 1 ? 's' : ''} remaining
        </div>
      )}
    </div>
  )
}