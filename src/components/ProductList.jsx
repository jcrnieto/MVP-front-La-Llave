const ProductList = ({ products, cart, onChange }) => {
  return (
    <div className="p-4 space-y-4">
      { products && products.map((product) => {
        const current = cart.find((p) => p.id === product.id)
        const quantity = current?.quantity || 0

        return (
          <div key={product.id} className="flex justify-between items-center border p-3 rounded-xl shadow-sm">
             <img
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
            <div>
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onChange(product, Math.max(quantity - 1, 0))}>➖</button>
              <span>{quantity}</span>
              <button onClick={() => onChange(product, quantity + 1)}>➕</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ProductList;