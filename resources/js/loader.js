let loader = {
    getLoaderElement() {
        return document.querySelector("#loading");
    },
    show() {
        loader.getLoaderElement().classList.remove("loader-processed")
        setTimeout( () => {
            let element = loader.getLoaderElement();
            if (!element.classList.contains("loader-processed")) {
                element.classList.add("display");
            }
        }, 100)

    },
    hide() {
        let element = loader.getLoaderElement();
        element.classList.add("loader-processed")
        element.classList.remove("display");
    },
}

export default loader
