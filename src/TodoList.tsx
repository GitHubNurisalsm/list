import { useEffect, useState, type FormEvent } from 'react'
import './TodoList.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

const STORAGE_KEY = 'todos'

const isTodo = (value: unknown): value is Todo => {
  const todo = value as Todo
  return (
    typeof todo === 'object' &&
    todo !== null &&
    typeof todo.id === 'number' &&
    typeof todo.text === 'string' &&
    typeof todo.done === 'boolean'
  )
}

const loadTodos = (): Todo[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter(isTodo) : []
  } catch {
    return []
  }
}

const today = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // localStorage может быть недоступен (приватный режим, переполнение)
    }
  }, [todos])

  const addTodo = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }])
    setText('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const doneCount = todos.filter((todo) => todo.done).length
  const progress = todos.length === 0 ? 0 : Math.round((doneCount / todos.length) * 100)

  return (
    <main className="todo-page">
      <section className="todo-card">
        <header className="todo-header">
          <div>
            <p className="todo-date">{today}</p>
            <h1 className="todo-title">Мои задачи</h1>
          </div>
          {todos.length > 0 && (
            <span className="todo-stat">
              {doneCount} из {todos.length}
            </span>
          )}
        </header>

        <div
          className="todo-progress"
          role="progressbar"
          aria-label="Выполнено задач"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="todo-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="Что нужно сделать?"
            aria-label="Новая задача"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="todo-add" disabled={!text.trim()}>
            Добавить
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="todo-empty">
            <div className="todo-empty-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3 8-8" />
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
              </svg>
            </div>
            <p className="todo-empty-title">Задач пока нет</p>
            <p className="todo-empty-text">Добавьте первую задачу в поле выше</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => {
              return (
                <li key={todo.id} className={`todo-item ${todo.done ? 'is-done' : ''}`}>
                  <input
                    type="checkbox"
                    className="todo-check"
                    id={`todo-${todo.id}`}
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label htmlFor={`todo-${todo.id}`} className="todo-text">
                    {todo.text}
                  </label>
                  <button
                    type="button"
                    className="todo-delete"
                    aria-label={`Удалить «${todo.text}»`}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6h18" />
                      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}

export default TodoList
