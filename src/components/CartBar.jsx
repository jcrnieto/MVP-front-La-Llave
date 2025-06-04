const CartBar = ({ total, onClick }) => {
    console.log('CartBar total:', total);

    return (
    <div className="fixed bottom-0 left-0 right-0 bg-orange-600 text-white px-4 py-3 flex justify-between items-center shadow-lg">
      <span>Total: ${total}</span>
      <button
        onClick={onClick}
        className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold"
      >
        Comprar
      </button>
    </div>   
    )
}

export default CartBar;