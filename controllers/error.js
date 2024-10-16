export const get404Page = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "404",
      path: "",

    });
};

export const get500Page = (req, res, next) => {
  res
    .status(500)
    .render("500", {
      pageTitle: "500",
      path: "",
    });
};


