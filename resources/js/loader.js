let loader = {
    getLoaderElement() {
        return document.querySelector("#loading");
    },
    show() {
        loader.getLoaderElement().classList.add("display");
    },
    hide() {
        loader.getLoaderElement().classList.remove("display");
    },
}

export default loader
