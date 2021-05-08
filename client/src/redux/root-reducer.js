import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";
import mailReducer from "./mails/mail.reducer";
import categoryReducer from "./categories/category.reducer";
import authorityReducer from "./authority/authority.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  mail: mailReducer,
  category: categoryReducer,
  authority: authorityReducer,
});

export default rootReducer;
