function Pdt_contact() {
  return (
    <>
      <div className="ptd-contact">
        <h4>FASHION & MAKEUP LIMITED LIABILITY COMPANY</h4>
        <h5>3104 E Camelback Rd #2868 Phoenix, AZ 8501</h5>
        <p>
          <i class="fa fa-mobile" aria-hidden="true"></i>
          <a href="tel:+16237558567">+1 623 755-8567</a>
        </p>
        <p onClick={() => (window.location = 'mailto:sales@fashionandmakeupusa.com')}>
          <i class="fa fa-envelope-o" aria-hidden="true"></i> Email: sales@fashionandmakeupusa.com
        </p>
      </div>
    </>
  );
}

export default Pdt_contact;
