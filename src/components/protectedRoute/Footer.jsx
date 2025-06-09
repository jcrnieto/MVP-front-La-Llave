const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Nombre de tu compania. Todos los derechos reservados.</p>
        <p>
          <a href="/privacy-policy" className="text-blue-400 hover:underline">Politica de privacidad</a> | 
          <a href="/terms-of-service" className="text-blue-400 hover:underline"> Terminos y condiciones</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;