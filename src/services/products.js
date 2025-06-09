import { supabase } from '../config/supabaseConfig';

export const getProducts = async () => {
  const { data, error } = await supabase.from('products_la_llave').select('*');
  if (error) {
    console.error('Error al traer productos:', error);
    return [];
  }
  return data;
};

export const updateProduct = async (product) => {
  const { data, error } = await supabase
    .from('products_la_llave')
    .update({
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    })
    .eq('id', product.id)
    .select();

  if (error) {
    console.error('Error al actualizar producto:', error);
    return null;
  }
  return data[0];
}

export const deleteProduct = async (id) => {
  const { data, error } = await supabase
    .from('products_la_llave')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error al eliminar producto:', error);
    return null;
  }
  return data[0];
};

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products_la_llave')
    .insert({
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    })
    .select();

  if (error) {
    console.error('Error al crear producto:', error);
    return null;
  }
  return data[0];
};