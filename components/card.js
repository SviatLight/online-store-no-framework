export default class Card {
    constructor (someProduct) {
        this.state = someProduct;
        this.render();
    }

    getTemplate () {
        const result = `
            <div class="p-0 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
                <div class="card-wrapper">
                    <div class="card-flex">
                        <div class="card-img">
                            <img src=${this.state.images[0]} alt=${this.state.category} />
                        </div>
                        <div class="card-info">
                            <div class="info-rate-price">
                                <div class="card-rate">
                                    <span>${this.state.rating}</span>
                                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.26296 3.60776L6.99999 0L4.73701 3.60776L0.34259 4.49139L3.33842 7.60474L2.88549 11.7586L6.99999 10.075L11.1145 11.7586L10.6616 7.60474L13.6574 4.49139L9.26296 3.60776ZM11.6722 5.11223L8.64429 4.50338L6.99999 1.88193L5.35568 4.50338L2.32777 5.11223L4.38321 7.24829L4.06171 10.1968L6.99999 8.99452L9.93826 10.1968L9.61676 7.24829L11.6722 5.11223Z" fill="white"/>
                                    </svg>
                                </div>
                                <div class="card-price">
                                    <span>${this.state.price}</span>
                                </div>
                            </div>
                            <div class="card-decs">
                                <p>${this.state.title}</p>
                            </div>
                            <div class="card-category">
                                <span>${this.state.category}</span>
                            </div>
                        </div>
                    </div>
                    <a class="card-btn-add">
                        <span>add to card</span>
                    </a>
                </div>
            </div>
        `
        return result;
    }

    update (data = {}) {
        this.state = data;
        this.componentElement.innerHTML = this.getTemplate();
    }

    render () {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
    
        this.element = wrapper.firstElementChild;
    }
}