import { supabase } from '../config/supabaseConfig';

export const getPromotions = async () => {
  const { data, error } = await supabase
    .from('promotions_la_llave')
    .select('*');

  if (error) {
    console.error('Error al obtener promociones:', error);
    return [];
  }
//   console.log('data',data)
  return data;
};

export const createPromotion = async (promotion) => {
  const { data, error } = await supabase
    .from('promotions_la_llave')
    .insert({
      name: promotion.name,
      image_url: promotion.image_url,
      price: promotion.price,
    })
    .select();

  if (error) {
    console.error('Error al crear promoción:', error);
    return null;
  }
  return data[0];
}

export const updatePromotion = async (promotion) => {
  const { data, error } = await supabase
    .from('promotions_la_llave')
    .update({
      name: promotion.name,
      image_url: promotion.image_url,
      price: promotion.price,
    })
    .eq('id', promotion.id)
    .select();

  if (error) {
    console.error('Error al actualizar promoción:', error);
    return null;
  }
  return data[0];
};

export const deletePromotion = async (id) => {
  const { data, error } = await supabase
    .from('promotions_la_llave')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error al eliminar promoción:', error);
    return null;
  }
  return data[0];
};