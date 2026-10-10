import PageHero from '../components/common/PageHero';
import ArticuloDestacado from '../components/blog/ArticuloDestacado';
import Newsletter from '../components/blog/Newsletter';

const BlogPage = () => {
  return (
    <>
      <PageHero title="Historias de la bodega" />
      <ArticuloDestacado />
      <Newsletter />
    </>
  );
};

export default BlogPage;
