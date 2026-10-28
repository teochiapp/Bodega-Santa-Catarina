import FormularioContacto from '../components/contacto/FormularioContacto';
import InfoContacto from '../components/contacto/InfoContacto';
import ContactDepartamentos from '../components/contacto/ContactDepartamentos';

const ContactoPage = () => {
  return (
    <main style={{ backgroundColor: '#F2ECE4', minHeight: '100vh', width: '100%' }}>
      <FormularioContacto />
      <InfoContacto />
      <ContactDepartamentos />
    </main>
  );
};

export default ContactoPage;
