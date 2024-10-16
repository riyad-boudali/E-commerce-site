const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrftToken = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElement = btn.closest('article')
  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrftToken,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
        productElement.remove()
    })
    .catch((err) => {
      console.log(err);
    });
};
