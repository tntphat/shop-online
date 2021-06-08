import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { productSagas } from "./product/product.sagas";
import { mailSagas } from "./mails/mail.sagas";
import { invoiceSagas } from "./invoice/invoice.sagas";
import { categorySagas } from "./categories/category.sagas";
import { authoritySagas } from "./authority/authority.sagas";

export default function* rootSaga() {
  yield all([
    call(productSagas),
    call(userSagas),
    call(mailSagas),
    call(invoiceSagas),
    call(categorySagas),
    call(authoritySagas),
  ]);
}
