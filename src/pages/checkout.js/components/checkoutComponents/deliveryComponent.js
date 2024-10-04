function DilveryMethods() {
  return (
    <>
      {' '}
      <div style={{marginTop:"50px"}} class="table-responsive mb-6">
        <table class="table table-bordered table-sm table-hover mb-0">
          <tbody>
            <tr>
              <td>
                <div class="form-check custom-radio">
                  <input class="form-check-input" id="checkoutShippingStandard" name="shipping" type="radio" />
                  <label class="form-check-label text-body text-nowrap" for="checkoutShippingStandard">
                    Standard Shipping
                  </label>
                </div>
              </td>
              <td>Delivery in 5 - 7 working days</td>
              <td>$8.00</td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-radio">
                  <input class="form-check-input" id="checkoutShippingExpress" name="shipping" type="radio" />
                  <label class="form-check-label text-body text-nowrap" for="checkoutShippingExpress">
                    Express Shipping
                  </label>
                </div>
              </td>
              <td>Delivery in 3 - 5 working days</td>
              <td>$12.00</td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-radio">
                  <input class="form-check-input" id="checkoutShippingShort" name="shipping" type="radio" />
                  <label class="form-check-label text-body text-nowrap" for="checkoutShippingShort">
                    1 - 2 Shipping
                  </label>
                </div>
              </td>
              <td>Delivery in 1 - 2 working days</td>
              <td>$18.00</td>
            </tr>
            <tr>
              <td>
                <div class="form-check custom-radio">
                  <input class="form-check-input" id="checkoutShippingFree" name="shipping" type="radio" />
                  <label class="form-check-label text-body text-nowrap" for="checkoutShippingFree">
                    Free Shipping
                  </label>
                </div>
              </td>
              <td>Living won't the He one every subdue meat replenish face was you morning firmament darkness.</td>
              <td>$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>{' '}
    </>
  );
}

export default DilveryMethods;
