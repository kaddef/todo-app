export function get404(req, res) {
    console.log("In 404 Endpoint")
    res.status(404).render('404.ejs', { pageTitle: "Omg 404" });
}

export function get500(req, res) {
    console.log("In 500 Endpoint")
    res.status(500).render('500.ejs', { pageTitle: "Omg 500" });
}