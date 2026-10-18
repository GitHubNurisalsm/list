import { useState, type FormEvent } from 'react'
import ShoppingItem from './ShoppingItem.tsx'
import './ShoppingList.css'

type Product = {
  id: number
  name: string
  price: number
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price) + ' сом'

function ShoppingList() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const trimmedName = name.trim()
  const parsedPrice = Number(price)
  const isValid = trimmedName !== '' && price !== '' && Number.isFinite(parsedPrice) && parsedPrice >= 0

  const addProduct = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setProducts([...products, { id: Date.now(), name: trimmedName, price: parsedPrice }])
    setName('')
    setPrice('')
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const total = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <main className="shop-page">
      <section className="shop-card">
        <header className="shop-header">
          <h1 className="shop-title">Список покупок</h1>
          <p className="shop-subtitle">Добавьте товары, а итог посчитается сам</p>
        </header>

        <form className="shop-form" onSubmit={addProduct}>
          <input
            type="text"
            className="shop-input shop-input-name"
            placeholder="Название"
            aria-label="Название товара"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="shop-input shop-input-price"
            placeholder="Цена"
            aria-label="Цена товара"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit" className="shop-add" disabled={!isValid}>
            Добавить
          </button>
        </form>

        {products.length === 0 ? (
          <p className="shop-empty">Список пуст — добавьте первый товар</p>
        ) : (
          <ul className="shop-list">
            {products.map((product) => {
              return (
                <ShoppingItem
                  key={product.id}
                  name={product.name}
                  price={formatPrice(product.price)}
                  onDelete={() => deleteProduct(product.id)}
                />
              )
            })}
          </ul>
        )}

        <footer className="shop-total">
          <span>Итого{products.length > 0 && ` · ${products.length} шт.`}</span>
          <strong className="shop-total-sum">{formatPrice(total)}</strong>
        </footer>
      </section>
    </main>
  )
}

export default ShoppingList
