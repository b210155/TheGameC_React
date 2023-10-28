import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL, API_URL } from "../../constants";

import ProductTypes from "./ProductTypes";
import ProductItems from "./ProductItems";
import classes from "./Products.module.css";

const Products = (props) => {
  /* 登入狀態 */
  const isUserLoggedIn = useSelector((state) => state.login.isUserLoggedIn);
  const userInfo = useSelector((state) => state.login.userInfo);

  const [products, setProducts] = useState([]); // 所有商品
  /* 重要：由於商品是在useEffect中非同步地從API中獲取商品數據，所以在第一次渲染時products還沒有值，
  會是undefined，故傳到子元件的map()或filter()時就會出錯，因此初始要給予其空陣列。 */
  const [productType, setProductType] = useState("所有商品"); // 商品類型 (預設為所有)
  const [pInCart, setPInCart] = useState([]); // 購物車內的商品 (這裡只存 product_id)
  const [pInOrder, setPInOrder] = useState([]); // 商品已在購買訂單(已被購買)

  /* 使用 Effect 獲取商品資料表 */
  useEffect(() => {
    // 從 express 獲取資料
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          API_URL + "/products/api/products_select"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("錯誤獲取 products_select:", err);
      }
    };
    fetchProducts();
  }, []);

  /* 選擇類型 */
  const selectedTypeHandler = (selectedType) => {
    setProductType(() => selectedType);
  };

  /* 加入購物車 */
  // 當商品加入購物車後，重新渲染將cart更新至最新狀態 (以便讓購物車按鈕馬上套用禁按css)
  const productToCartHandler = async (product_id, price, age_rating) => {
    // 年齡限制
    if (userInfo.current_age >= parseInt(age_rating)) {
      try {
        const response = await axios.post(
          API_URL + "/shoppingCart/api/shoppingCart_insert",
          { user_id: userInfo.user_id, product_id, price }
        );
        alert(response.data.message);
        setPInCart((prevState) => [...prevState, product_id]);
      } catch (err) {
        console.error("錯誤獲取 shoppingCart_insert:", err);
      }
    } else {
      alert(`此商品為${age_rating}+，您目前的年齡尚無法獲取此商品。`);
    }
  };

  /* 購物車內的商品 (提取 product_id，來做 PItem 的購物車按鈕判斷) */
  useEffect(() => {
    if (isUserLoggedIn) {
      const fetchCart = async () => {
        try {
          await axios
            .get(
              `${API_URL}/shoppingCart/api/shoppingCart_select?user_id=${userInfo.user_id}`
            )
            .then((response) => {
              const inCartPID = response.data.map(
                (cartItem) => cartItem.product_id
              );
              setPInCart(inCartPID);
            });
        } catch (err) {
          console.error("錯誤獲取 shoppingCart_select:", err);
        }
      };
      fetchCart();
    } else {
      setPInCart([]);
    }
  }, [isUserLoggedIn]); // isUserLoggedIn 為異步，所以在組件最初掛載時，可能還沒有設定，使得撈不到資料。所以設定當用登入後才撈資料

  /* 已購買的商品 */
  useEffect(() => {
    if (isUserLoggedIn) {
      const fetchOrder = async () => {
        try {
          await axios
            .get(
              `${API_URL}/products/api/orders_select?user_id=${userInfo.user_id}`
            )
            .then((response) => {
              if (response.data.length <= 0) return;
              // 使用 reduce() 和 concat() 來合併多個陣列
              const inOrderPID = response.data.reduce((acc, curr) => {
                return acc.concat(JSON.parse(curr.product_id));
                // JSON.parse()可將字串轉成陣列 (product_id 為 "[...]"，這裡將其轉為 [...])
                // 將各個陣列 JSON.parse(result.product_id) 加到累積器 acc 中
              }, []); // 設定 [] 為 acc 初始值
              setPInOrder(inOrderPID);
            });
        } catch (err) {
          console.error("錯誤獲取 order_select:", err);
        }
      };
      fetchOrder();
    } else {
      setPInOrder([]);
    }
  }, [isUserLoggedIn]);

  return (
    <div className={classes.productsPage}>
      <ProductTypes dataFetch={products} onGetType={selectedTypeHandler} />
      <ProductItems
        dataFetch={products}
        selectProductType={productType}
        onAddtoCart={productToCartHandler}
        dataFetchCart={pInCart}
        dataFetchOrder={pInOrder}
      />
    </div>
  );
};

export default Products;

// fake API
// const productsData = [
//   {
//     product_name: "俠盜獵車手5",
//     product_type: "動作",
//     image: "action/GTA5.jpg",
//     price: 1300,
//     age_rating: "18",
//     buy_count: 25021,
//   },
//   {
//     product_name: "碧血狂殺2",
//     product_type: "動作",
//     image: "action/Red_Dead_Redemption_1.jpg",
//     price: 1300,
//     age_rating: "18",
//     buy_count: 6032,
//   },
//   {
//     product_name: "最後生還者2",
//     product_type: "動作",
//     image: "action/The_last_of_us_2.jpg",
//     price: 1300,
//     age_rating: "12",
//     buy_count: 5125,
//   },
//   {
//     product_name: "塞爾達傳說 曠野之息",
//     product_type: "冒險",
//     image: "adventure/zelda.png",
//     price: 1490,
//     age_rating: "12",
//     buy_count: 11221,
//   },
//   {
//     product_name: "霍格華茲的傳承",
//     product_type: "冒險",
//     image: "adventure/hogwarts_legacy.jpg",
//     price: 1800,
//     age_rating: "12",
//     buy_count: 12110,
//   },
//   {
//     product_name: "BeamNG.drive",
//     product_type: "模擬",
//     image: "simulation/BeamNG_drive.jpg",
//     price: 378,
//     age_rating: "12",
//     buy_count: 9012,
//   },
//   {
//     product_name: "模擬市民4",
//     product_type: "模擬",
//     image: "simulation/theSims4.jpg",
//     price: 200,
//     age_rating: "0",
//     buy_count: 13031,
//   },
//   {
//     product_name: "文明帝國6",
//     product_type: "策略",
//     image: "strategy/Civilization.jpg",
//     price: 975,
//     age_rating: "6",
//     buy_count: 7512,
//   },
//   {
//     product_name: "世紀帝國4",
//     product_type: "策略",
//     image: "strategy/AOE4.jpg",
//     price: 679,
//     age_rating: "6",
//     buy_count: 9288,
//   },
//   {
//     product_name: "NBA 2K19",
//     product_type: "運動與競技",
//     image: "Sports_and_racing/nba2k.jpg",
//     price: 600,
//     age_rating: "0",
//     buy_count: 7512,
//   },
//   {
//     product_name: "鬥陣特工2",
//     product_type: "運動與競技",
//     image: "Sports_and_racing/overwatch.jpg",
//     price: 938,
//     age_rating: "12",
//     buy_count: 8088,
//   },
// ];
