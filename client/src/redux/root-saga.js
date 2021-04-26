import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { productSagas } from "./product/product.sagas";
import { mailSagas } from "./mails/mail.sagas";
import { categorySagas } from "./categories/category.sagas";

export default function* rootSaga() {
  yield all([
    call(productSagas),
    call(userSagas),
    call(mailSagas),
    call(categorySagas),
  ]);
}
