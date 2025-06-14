import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import ProductList from '../components/ProductList'
import PaymentMethods from '../components/PaymentMethods'
import CartBar from '../components/CartBar'
import SummaryModal from '../components/SummaryModal'
import PersonalDataForm from '../components/PersonalDataForm'
// import products from '../data/products'
//import promotions from './data/promotions' 
import { getPromotions } from '../services/promotions';
import { getProducts } from '../services/products'
import PromotionList from '../components/PromotionList'

const Home = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])
  const [payment, setPayment] = useState('efectivo')
  const [showSummary, setShowSummary] = useState(false)
  const [personalData, setPersonalData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchPromotions = async () => {
      const promos = await getPromotions();
      setPromotions(promos);
      // console.log('Promotions fetched:', promos);

      const prods = await getProducts();
      setProducts(prods);
      // console.log('Products fetched:', prods);
  };

  fetchPromotions();
  }, []);


  const handleAddProduct = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity } : p
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const handleAddToCart = (promo) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === promo.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === promo.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...promo, quantity: 1 }];
      }
    });
  };

  

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)


    return(
        <div className="min-h-screen flex flex-col bg-white pb-20">
      <Header />
      <h2 className="text-center text-3xl font-bold text-orange-600 my-4">¡Hacé tu pedido ya!</h2>
      <h3 className="text-center text-2xl font-semibold text-gray-800 my-4">Destacados</h3>
      <Carousel promotions={promotions} onAddToCart={handleAddToCart}/>
      <h3 className="text-center text-2xl font-semibold text-gray-800 my-4">Promociones</h3>
      <PromotionList promotions={promotions} cart={cart} onChange={handleAddProduct} />
      <h3 className="text-center text-2xl font-semibold text-gray-800 my-4">Productos</h3>
      <ProductList products={products} cart={cart} onChange={handleAddProduct} />
      <PersonalDataForm personalData={personalData} onChange={setPersonalData} />
      <PaymentMethods selected={payment} onChange={setPayment} />
      <CartBar
         total={total}
         onClick={() => setShowSummary(true)}
         key={cart.length + total} 
      />
      <SummaryModal
        visible={showSummary}
        onClose={() => setShowSummary(false)}
        cart={cart}
        total={total}
        payment={payment}
        personalData={personalData}
      />
    </div>
    )
}
export default Home;

