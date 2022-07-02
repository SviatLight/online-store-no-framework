export default class Category {
    constructor (data = []) {
        this.data = data;
        
        this.getTemplate();
        this.render();
    }

    getTemplate () {
        return `
            <div>
                ${
                    this.data.map(item => {
                        return `
                            <div class="category-item">
                                <input type="checkbox">
                                <lable>${item}</lable>
                            </div>
                        `
                    }).join('')
                }
            </div>
        `
    }

    render () {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
    
        this.element = wrapper.firstElementChild;
    }
}