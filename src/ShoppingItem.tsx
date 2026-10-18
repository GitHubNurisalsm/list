type ShoppingItemProps = {
  name: string
  price: string
  onDelete: () => void
}

function ShoppingItem({ name, price, onDelete }: ShoppingItemProps) {
  return (
    <li className="shop-item">
      <span className="shop-item-name">{name}</span>
      <span className="shop-item-price">{price}</span>
      <button type="button" className="shop-delete" aria-label={`Удалить «${name}»`} onClick={onDelete}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        </svg>
      </button>
    </li>
  )
}

export default ShoppingItem
