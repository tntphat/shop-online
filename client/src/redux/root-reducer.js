import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";
import mailReducer from "./mails/mail.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  mail: mailReducer,
});

export default rootReducer;
