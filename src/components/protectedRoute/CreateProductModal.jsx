import { useState } from 'react'
import { supabase } from '../../config/supabaseConfig'

const CreateProductModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    // 1. Generar nombre único para la imagen
    const fileName = `${Date.now()}-${image.name}`;

    //2. Subir a Supabase Storage
    const { data, error } = await supabase.storage
    .from("products-la-llave") // <-- nombre de tu bucket
    .upload(fileName, image);

    if (error) {
        console.error("Error al subir imagen:", error.message);
        return;
    }

    // 3. Obtener la URL pública
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("products-la-llave") // <-- nombre de tu bucket
        .createSignedUrl(fileName, 60 * 60);

    if (signedUrlError) {
      console.error("Error al generar URL firmada:", signedUrlError.message);
      return;
    }

    const imageUrl = signedUrlData.signedUrl;
    //console.log('URL generada:', imageUrl);

    // 4. Guardar en la tabla
    await onSave({
        name: name,
        price: parseFloat(price),
        image_url: imageUrl,
    });

    setName('');
    setPrice('');
    setImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-gray-400 p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Agregar nuevo producto</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full mb-4"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Vista previa"
              className="w-32 h-32 object-cover mb-4"
            />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
