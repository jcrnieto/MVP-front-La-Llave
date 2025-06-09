// import { useState } from 'react'
// import Modal from './Modal'
// import { supabase } from '../../config/supabaseConfig'

// const ProductModal = ({ product, onClose, onDelete}) => {

//   const [newImage, setNewImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [formData, setFormData] = useState({ ...product });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: name === 'price' ? Number(value) : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let imageUrl = product.image_url;

//     if (newImage) {
//       const fileExt = newImage.name.split('.').pop();
//       const fileName = `${Date.now()}.${fileExt}`;

//       const { error: uploadError } = await supabase.storage
//         .from('products-la-llave')
//         .upload(fileName, newImage);

//       if (uploadError) {
//         console.error("Error al subir imagen:", uploadError.message);
//         return;
//       }

//       imageUrl = fileName;
//     }

//     const { error: updateError } = await supabase
//       .from('products_la_llave')
//       .update({
//         name: formData.name,
//         price: formData.price,
//         image_url: imageUrl,
//       })
//       .eq('id', product.id);

//     if (updateError) {
//       console.error("Error al actualizar producto:", updateError.message);
//     } else {
//       onClose();
//     }
//     // onSave(formData);
//   };

//   return(
//      <Modal onClose={onClose}>
//       <h3 className="text-xl font-bold mb-4">Editar producto</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 w-full mb-2"
//         />
//         <input
//           name="price"
//           type="number"
//           value={formData.price}
//           onChange={handleChange}
//           className="border p-2 w-full mb-4"
//         />

//         {/* Vista previa o imagen actual */}
//         {previewImage ? (
//           <img
//             src={previewImage}
//             alt="Vista previa"
//             className="w-32 h-32 object-cover mb-2"
//           />
//         ) : product.image_url ? (
//           <img
//             src={`https://<TU-PROJECT-ID>.supabase.co/storage/v1/object/public/products/${product.image_url}`}
//             alt="Imagen actual"
//             className="w-32 h-32 object-cover mb-2"
//           />
//         ) : null}

//         {/* Input de imagen */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             setNewImage(file);
//             setPreviewImage(URL.createObjectURL(file));
//           }}
//           className="mb-4"
//         />
        
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => onDelete(product.id)}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Eliminar
//           </button>
//           <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
//             Guardar
//           </button>
//         </div>
//       </form>
//     </Modal>
//   )
// };

// export default ProductModal;