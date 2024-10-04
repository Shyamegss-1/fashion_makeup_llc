import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productcategoryService } from '../../services/apiServices/apiService';
import { CATEGORY_COMPONENT } from '../../constants/route-path-constant';

function CategoriesComponents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    productcategoryService().then((e) => {
      setData(e.data.Category);
    });
  }, []);
  return (
    <>
      <div className="catefgory_dropdown">
        {data.map((e) => {
          return (
            <Link key={e.id} to={CATEGORY_COMPONENT(e.name.replaceAll(' ', '-'))}>
              <p className="nav-link" role="button">
                {e.name}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default CategoriesComponents;
