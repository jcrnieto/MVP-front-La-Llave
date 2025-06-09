import { useEffect, useState } from 'react';
import { getProducts, updateProduct, deleteProduct, createProduct } from '../../services/products';
import { getPromotions, updatePromotion, deletePromotion, createPromotion } from '../../services/promotions';
// import ProductModal from '../../components/protectedRoute/ProductModal';
import CreateProductModal from '../../components/protectedRoute/CreateProductModal';
import CreatePromotionModal from '../../components/protectedRoute/CreatePromotionModal';
import ItemModal from '../../components/protectedRoute/ItemModal';


const Admin = () => {
    const [products, setProducts] = useState([]);
    const [promotions, setPromotions] = useState([]);

    const [productSelected, setProductSelected] = useState(null);
    const [promotionSelected, setPromotionSelected] = useState(null);

    const [productCreate, setProductCreate] = useState(false);
    const [promotionCreate, setPromotionCreate] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const promotionsData = await getPromotions();
      setProducts(productsData);
      setPromotions(promotionsData);
    };

    fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-10">
            <h1 className="text-3xl font-bold text-center text-gray-800">Panel de Administración</h1>

            {/* Sección Productos */}
            <section>
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Productos</h2>
                <button
                    onClick={() => setProductCreate(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                    + Agregar producto
                </button>
                </div>
                <ul className="divide-y divide-gray-200">
                {products?.map((prod) => (
                    <li
                    key={prod.id}
                    className="py-3 px-2 cursor-pointer hover:bg-gray-50 rounded-md transition"
                    onClick={() => setProductSelected(prod)}
                    >
                    <div className="flex justify-between text-gray-800 font-medium">
                        <span>{prod.name}</span>
                        <span>${prod.price}</span>
                    </div>
                    </li>
                ))}
                </ul>
            </section>

            {/* Sección Promociones */}
            <section>
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Promociones</h2>
                <button
                    onClick={() => setPromotionCreate(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                    + Agregar promoción
                </button>
                </div>
                <ul className="divide-y divide-gray-200">
                {promotions?.map((promo) => (
                    <li
                    key={promo.id}
                    className="py-3 px-2 cursor-pointer hover:bg-gray-50 rounded-md transition"
                    onClick={() => setPromotionSelected(promo)}
                    >
                    <div className="flex justify-between text-gray-800 font-medium">
                        <span>{promo.name}</span>
                        <span>${promo.price}</span>
                    </div>
                    </li>
                ))}
                </ul>
            </section>

            {/* Modales */}
            {productSelected && (
                <ItemModal
                item={productSelected}
                tableName="products_la_llave"
                storageBucket="products-la-llave"
                onClose={() => setProductSelected(null)}
                onSave={async (updateDate) => {
                    await updateProduct(updateDate);
                    setProductSelected(null);
                    const update = await getProducts();
                    setProducts(update);
                }}
                onDelete={async (id) => {
                    await deleteProduct(id);
                    setProductSelected(null);
                    const update = await getProducts();
                    setProducts(update);
                }}
                />
            )}

            {productCreate && (
                <CreateProductModal
                onClose={() => setProductCreate(false)}
                onSave={async (newProduct) => {
                    await createProduct(newProduct);
                    const updated = await getProducts();
                    setProducts(updated);
                    setProductCreate(false);
                }}
                />
            )}

            {promotionSelected && (
                <ItemModal
                item={promotionSelected}
                tableName="promotions_la_llave"
                storageBucket="products-la-llave"
                onClose={() => setPromotionSelected(null)}
                onSave={async (updateDate) => {
                    await updatePromotion(updateDate);
                    setPromotionSelected(null);
                    const update = await getPromotions();
                    setPromotions(update);
                }}
                onDelete={async (id) => {
                    await deletePromotion(id);
                    setPromotionSelected(null);
                    const update = await getPromotions();
                    setPromotions(update);
                }}
                />
            )}

            {promotionCreate && (
                <CreatePromotionModal
                onClose={() => setPromotionCreate(false)}
                onSave={async (newProduct) => {
                    await createPromotion(newProduct);
                    const updated = await getPromotions();
                    setPromotions(updated);
                    setPromotionCreate(false);
                }}
                />
            )}
            </div>
        </div>
        );

}

export default Admin;