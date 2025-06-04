
const PersonalDataForm = ({ personalData, onChange }) => {
//   console.log('personalData', personalData); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...personalData, [name]: value });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Datos personales</h3>
      <div className="space-y-3">
        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          value={personalData.fullName}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={personalData.phone}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección de envío"
          value={personalData.address}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
};

export default PersonalDataForm;
