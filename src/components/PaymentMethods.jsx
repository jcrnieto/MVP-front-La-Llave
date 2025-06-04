const PaymentMethods = ({ selected, onChange }) => {
  return (
   <div className="p-4">
      <h3 className="font-bold mb-2">Método de pago</h3>
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="pago"
            value="efectivo"
            checked={selected === 'efectivo'}
            onChange={(e) => onChange(e.target.value)}
          />
          Efectivo
        </label>
        <label>
          <input
            type="radio"
            name="pago"
            value="transferencia"
            checked={selected === 'transferencia'}
            onChange={(e) => onChange(e.target.value)}
          />
          Transferencia
        </label>
      </div>
    </div>
  );
}

export default PaymentMethods;