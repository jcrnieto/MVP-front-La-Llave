const PromotionList = ({ promotions, cart, onChange }) => {
  return (
    <div className="p-4 space-y-4">
      {promotions && promotions.map((promo) => {
        const current = cart.find((p) => p.id === promo.id)
        const quantity = current?.quantity || 0

        return (
          <div key={promo.id} className="flex justify-between items-center border p-3 rounded-xl shadow-sm">
             <img
                src={promo.image_url}
                alt={promo.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
            <div>
              <h2 className="text-lg font-medium">{promo.name}</h2>
              <p className="text-sm text-gray-500">${promo.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onChange(promo, Math.max(quantity - 1, 0))}>➖</button>
              <span>{quantity}</span>
              <button onClick={() => onChange(promo, quantity + 1)}>➕</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default PromotionList;