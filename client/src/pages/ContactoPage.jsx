import PageHero from '../components/common/PageHero';
import InfoContacto from '../components/contacto/InfoContacto';
import FormularioContacto from '../components/contacto/FormularioContacto';
import MapaContacto from '../components/contacto/MapaContacto';

const ContactoPage = () => {
  return (
    <>
      <PageHero title="Contacto" />
      <InfoContacto />
      <FormularioContacto />
      <MapaContacto />
    </>
  );
};

export default ContactoPage;
