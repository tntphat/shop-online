import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";
import mailReducer from "./mails/mail.reducer";
import categoryReducer from "./categories/category.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  mail: mailReducer,
  category: categoryReducer,
});

export default rootReducer;
