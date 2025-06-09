export default function SummaryModal({ visible, onClose, cart, total, payment, personalData }) {
  if (!visible) return null
//   console.log('personalData', personalData)
  const generateMessage = () => {
    let message = '🛒 Pedido Maxi-Kiosco La Llave\n\n📦 Productos:\n'
    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} - $${item.price * item.quantity}\n`
    })
    message += `\n💰 Total: $${total}\n📲 Pago: ${payment}`

    if (!personalData.fullName || !personalData.phone || !personalData.address) {
        return alert('Por favor completá tus datos personales antes de continuar.');
    }

    message += `\n\n🧾 Datos personales:\n`
    message += `👤 Nombre: ${personalData.fullName}\n`
    message += `📞 Teléfono: ${personalData.phone}\n`
    message += `📍 Dirección: ${personalData.address}`

    return encodeURIComponent(message)
  }

  // const whatsappLink = `https://wa.me/5493516468746?text=${generateMessage()}`

  const handleSend = () => {
    const msg = generateMessage();
    if (!msg) return; // Por si faltan datos

    const link = `https://wa.me/5493516468746?text=${msg}`;
    window.open(link, '_blank'); // Abre WhatsApp en nueva pestaña

    onClose();
    navigate('/admin');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>
        <div className="mb-4 text-sm text-gray-700 space-y-1">
            <p><strong>Nombre:</strong> {personalData.fullName}</p>
            <p><strong>Teléfono:</strong> {personalData.phone}</p>
            <p><strong>Dirección:</strong> {personalData.address}</p>
        </div>
        <ul className="mb-4">
          {cart.map((item) => (
            <li key={item.id}>
              {item.quantity}x {item.name} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p className="font-bold mb-2">Total: ${total}</p>
        <p className="mb-4">Método de pago: {payment}</p>
        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-500">Cancelar</button>
          <button
            onClick={handleSend}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            Enviar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
