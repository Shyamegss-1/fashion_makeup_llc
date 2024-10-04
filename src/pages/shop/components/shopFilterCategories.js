import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShopFilterComponent(props) {
  const [brandScroll, setBradScroll] = useState(false);
  const [colorScroll, setColorScroll] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.list);
    let x = data.filter((schema, index, self) => index === self.findIndex((obj) => obj.brand === schema.brand));
    x?.length > 5 ? setBradScroll(true) : setBradScroll(false);
    let y = data.filter((schema, index, self) => index === self.findIndex((obj) => obj.color === schema.color));
    y?.length > 5 ? setColorScroll(true) : setColorScroll(false);
  }, [props, []]);

  return (
    <>
      {' '}
      <div className="block block-layered-nav">
        <div className="block-title">Shop By</div>
        <div className="block-content">
          <p className="block-subtitle">Shopping Options</p>
          <dl id="narrow-by-list">
            <dt className="odd">Price</dt>
            <dd className="odd">
              <ol>
                <li style={{ display: 'flex' }}>
                  <span className="price_tag">$0</span>{' '}
                  <input
                    style={{ display: 'block' }}
                    type="range"
                    onChange={(e) => {
                      props.priceHandler(e);
                    }}
                    class="form-range"
                    min={0}
                    value={props.priceData}
                    max={10000}
                    step="100"
                    id="customRange3"
                  />
                  <span className="price_tag">${props.priceData}</span>
                </li>
              </ol>
            </dd>
            <dt className="even">Manufacturer</dt>
            <dd className="even">
              <ol className={brandScroll ? 'scroll_ui' : ''}>
                {data
                  .filter((schema, index, self) => index === self.findIndex((obj) => obj.brand === schema.brand))
                  .map((e, i, obj) => {
                    return (
                      <label key={e.id} className="check-box_Brand">
                        <input
                          type="checkbox"
                          disabled={obj.length == 1 ? true : false}
                          value={e.brand}
                          onChange={(e) => props.brandCheckedFun(e)}
                        />
                        <span class="checkbox-style">{e.brand}</span>
                      </label>
                    );
                  })}
              </ol>
            </dd>
            <dt className="odd">Color</dt>
            <dd className="odd">
              <ol className={colorScroll ? 'scroll_ui' : ''}>
                {data
                  .filter((schema, index, self) => index === self.findIndex((obj) => obj.color === schema.color))
                  .map((e, i, obj) => {
                    return (
                      <label key={e.id} className="check-box_Brand">
                        <input
                          type="checkbox"
                          disabled={obj.length == 1 ? true : false}
                          value={e.color}
                          onChange={(e) => props.colorCheckedFun(e)}
                        />
                        <span class="checkbox-style">{e.color}</span>
                      </label>
                    );
                  })}
              </ol>
            </dd>
            <dt className="last even">Size</dt>
            <dd className="last even">
              <ol>
                {data
                  .filter((schema, index, self) => index === self.findIndex((obj) => obj.size === schema.size))
                  .map((e, i, obj) => {
                    return (
                      <label key={e.id} className="check-box_Brand">
                        <input
                          type="checkbox"
                          disabled={obj.length == 1 ? true : false}
                          value={e.size}
                          onChange={(e) => props.sizeCheckedFun(e)}
                        />
                        <span class="checkbox-style">{e.size}</span>
                      </label>
                    );
                  })}
              </ol>
            </dd>
          </dl>
        </div>
      </div>
    </>
  );
}

export default ShopFilterComponent;
