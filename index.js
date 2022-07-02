import CardsList from "./components/cards-list.js"
import Pagination from "./components/pagination.js";
import Category from "./components/category.js";
import DoubleSlider from "./components/double-slider.js"

const BACKEND_URL = 'https://online-store.bootcamp.place/api/';

export default class OnlineStorePage {
  constructor () {
    this.pageSize = 9;
    this.products = [];
    this.urlProduct = new URL('products', BACKEND_URL);
    this.urlProduct.searchParams.set('_limit', this.pageSize);
    this.urlCategory = new URL('categories', BACKEND_URL);
    this.urlBrand = new URL('brands', BACKEND_URL);
    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();
    this.update(1);
    this.loadCategories();
    this.loadBrands(); 
    this.pushCategories();
    this.pushBrands();
  }

  async loadData (pageNumber) {
    this.urlProduct.searchParams.set('_page', pageNumber);

    const response = await fetch(this.urlProduct);
    const products = await response.json();
    console.log(products);
    return products;
  }

  async loadCategories () {
    const response = await fetch(this.urlCategory);
    const categories = await response.json();
    console.log(categories);
    return categories;
  }

  async loadBrands () {
    const response = await fetch(this.urlBrand);
    const brands = await response.json();
    console.log(brands);
    return brands;
  }

  async pushCategories () {
    const categories = await this.loadCategories();
    const category = new Category(categories);
    const categoryContainer = this.element.querySelector('#category');
    
    this.components.category = category;
    categoryContainer.append(this.components.category.element);
  }

  async pushBrands () {
    const brands = await this.loadBrands();
    const brand = new Category(brands);
    const categoryContainer = this.element.querySelector('#brand');
    
    this.components.category = brand;
    categoryContainer.append(this.components.category.element);
  }
  

  getTemplate () {
    return `
    <div class="container p-0">
      <div class="row">
        <div class="col left-side p-0">
          <div class="left-side-wrapper">
            <div id="doubleSliderPrice" class="double-slider-price">
              <h2>Price</h2>
            </div>
            <div id="category" class="category">
              <h2>Category</h2>
            </div>
            <div class="separate-decor"></div>
            <div id="brand" class="brand">
              <h2>Brand</h2>
            </div>
            <div class="separate-decor"></div>
            <div id="doubleSliderRating" class="double-slider-rating">
              <h2>Rating</h2>
            </div>
          </div>
          <button class="btn-clear-filters">Clear all filters</button>
        </div>
        <div class="col right-side p-0">
            <div class="search">
              <input type="text" placeholder="Search">
              <div class="search-icon">
                <svg width="19.25" height="19.25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_4_402)">
                    <path d="M11.742 10.344C12.7103 9.0227 13.144 7.3845 12.9563 5.75716C12.7687 4.12982 11.9735 2.63335 10.7298 1.56714C9.48616 0.50093 7.88579 -0.0563875 6.24888 0.00668566C4.61197 0.0697588 3.05923 0.748571 1.90131 1.90732C0.743395 3.06606 0.0656939 4.61929 0.00379204 6.25624C-0.0581098 7.8932 0.500353 9.49317 1.56745 10.7361C2.63455 11.9789 4.13159 12.7731 5.75906 12.9596C7.38654 13.1461 9.02442 12.7112 10.345 11.742H10.344C10.374 11.782 10.406 11.82 10.442 11.857L14.292 15.707C14.4796 15.8946 14.7339 16.0001 14.9992 16.0002C15.2645 16.0003 15.5189 15.895 15.7065 15.7075C15.8942 15.52 15.9997 15.2656 15.9997 15.0004C15.9998 14.7351 15.8946 14.4806 15.707 14.293L11.857 10.443C11.8213 10.4068 11.7828 10.3734 11.742 10.343V10.344ZM12 6.50001C12 7.22228 11.8578 7.93748 11.5814 8.60477C11.305 9.27206 10.8999 9.87837 10.3891 10.3891C9.87841 10.8998 9.27209 11.3049 8.6048 11.5813C7.93751 11.8577 7.22231 12 6.50004 12C5.77777 12 5.06258 11.8577 4.39528 11.5813C3.72799 11.3049 3.12168 10.8998 2.61096 10.3891C2.10023 9.87837 1.69511 9.27206 1.41871 8.60477C1.14231 7.93748 1.00004 7.22228 1.00004 6.50001C1.00004 5.04132 1.57951 3.64237 2.61096 2.61092C3.64241 1.57947 5.04135 1.00001 6.50004 1.00001C7.95873 1.00001 9.35768 1.57947 10.3891 2.61092C11.4206 3.64237 12 5.04132 12 6.50001Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath clipPath id="clip0_4_402">
                      <rect width="19.25" height="19.25" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <div class="card-list" data-element="cardsList">
                <!-- Cards List component -->
              </div>
              <div data-element="pagination">
                <!-- Pagination component -->
              </div>
            </div>
        </div>
      </div>
    </div> 
    `;
  }

  initComponents () {
    const totalElements = 100;
    const totalPages = Math.ceil(totalElements / this.pageSize);

    const cardsList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages: totalPages
    });
    const doubleSliderPrice = new DoubleSlider();
    const doubleSliderRating = new DoubleSlider({
      min: 0,
      max: 5
    });

    console.log(this.components);
    this.components.cardsList = cardsList;
    this.components.pagination = pagination;
    this.components.doubleSliderPrice = doubleSliderPrice;
    this.components.doubleSliderRating = doubleSliderRating;
  }

  renderComponents () {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');
    const doubleSliderPriceContainer = this.element.querySelector('#doubleSliderPrice');
    const doubleSliderRatingContainer = this.element.querySelector('#doubleSliderRating');
    
    cardsContainer.append(this.components.cardsList.element);
    paginationContainer.append(this.components.pagination.element);
    doubleSliderPriceContainer.append(this.components.doubleSliderPrice.element);
    doubleSliderRatingContainer.append(this.components.doubleSliderRating.element);
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  initEventListeners () {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = event.detail;
      this.update(pageIndex + 1);
    })
  }

  async update (pageNumber) {
    const data = await this.loadData(pageNumber);
    this.components.cardsList.update(data);
  }
}