import { Helmet } from 'react-helmet';

function HelmetMeta(props) {
  return (
    <>
      <Helmet>
        <meta name="keywords" content={props.keyword} />
        <meta name="description" content={props.discription} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.discription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fashionandmakeupusa.com" />
        <meta
          property="og:image"
          content="https://fashionandmakeupusa.com/admin/public/uploads/202208290507slideOne.3e5e8b291c1ac46ea839.jpg"
        />
        <meta name="twitter:card" content={props.discription} />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.discription} />
        <meta
          name="twitter:image"
          content="https://fashionandmakeupusa.com/admin/public/uploads/202208290507slideOne.3e5e8b291c1ac46ea839.jpg"
        />
      </Helmet>
    </>
  );
}

export default HelmetMeta;
