import PageHero from '../components/common/PageHero';
import ArticuloDestacado from '../components/blog/ArticuloDestacado';
import Newsletter from '../components/blog/Newsletter';

const BlogPage = () => {
  return (
    <>
      <PageHero
        tag="HISTORIAS DE LA BODEGA"
        title="Blog"
        image="/breadcrumbs/breadcrumb-blog.webp"
        imageAlt="Blog Bodega Santa Catarina"
      />
      <ArticuloDestacado />
      <Newsletter />
    </>
  );
};

export default BlogPage;
