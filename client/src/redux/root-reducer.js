import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";
import mailReducer from "./mails/mail.reducer";
import invoiceReducer from "./invoice/invoice.reducer";
import categoryReducer from "./categories/category.reducer";
import authorityReducer from "./authority/authority.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  invoice: invoiceReducer,
  mail: mailReducer,
  category: categoryReducer,
  authority: authorityReducer,
});

export default rootReducer;
