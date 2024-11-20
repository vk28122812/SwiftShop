// import Product from "./Product";
// import { DUMMY_PRODUCTS } from "../dummy-products";
// export default function Shop() {
//   return (
//     <section id="shop">
//       <h2>Elegant Clothing For Everyone</h2>
//       <ul id="products">
//       {DUMMY_PRODUCTS.map((product) => (
//             <li key={product.id}>
//               <Product {...product}/>
//             </li>
//           ))}
//       </ul>
//     </section>
//   );
// }

import {useState, useEffect} from "react"
import { fetchProducts } from "../http";
import Product from "./Product";
export default function Shop() {
  
  const [products,setProducts] = useState([]);
  useEffect( ()=>{
    async function loadProducts(){
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }
    loadProducts();
  },[]);

  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">
      {products.map((product) => (
            <li key={product._id}>
              <Product {...product}/>
            </li>
          ))}
      </ul>
    </section>
  );
}
