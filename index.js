import CardsList from "./components/cards-list.js"
import Pagination from "./components/pagination.js";
import Category from "./components/category.js";
import DoubleSlider from "./components/double-slider.js"
import SearchBox from "./components/searchBox.js";

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
    this.reset();

    this.initEventListeners();
    this.update('_page', 1);
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
          <button class="btn-clear-filters" id="resetFilters">Clear all filters</button>
        </div>
        <div class="col right-side p-0">
          <div data-element="searchBox">
            <!-- SearchBox component -->
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

    const searchBox = new SearchBox();
    const cardsList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages: totalPages
    });
    const doubleSliderPrice = new DoubleSlider({
      min: 0,
      max: 85000
    });
    const doubleSliderRating = new DoubleSlider({
      min: 0,
      max: 5
    });

    console.log(this.components);
    this.components.searchBox = searchBox;
    this.components.cardsList = cardsList;
    this.components.pagination = pagination;
    this.components.doubleSliderPrice = doubleSliderPrice;
    this.components.doubleSliderRating = doubleSliderRating;
  }

  renderComponents () {
    const searchBoxContainer = this.element.querySelector('[data-element="searchBox"]');
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');
    const doubleSliderPriceContainer = this.element.querySelector('#doubleSliderPrice');
    const doubleSliderRatingContainer = this.element.querySelector('#doubleSliderRating');
    
    searchBoxContainer.append(this.components.searchBox.element)
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
      this.update('_page', pageIndex + 1);
    })

    this.components.searchBox.element.addEventListener('search-changed', e => {
      const searchBoxValue = e.detail;
      this.update('q', searchBoxValue)
    })
  }

  reset () {
    const btnReset = this.element.querySelector('#resetFilters');
    btnReset.addEventListener('click', () => {
      this.components.doubleSliderPrice.reset();
      this.components.doubleSliderRating.reset();
      console.log("click reset in");
    })
    console.log("click reset out");
  }

  async update (name, vaule) {
    if(name === 'q') this.urlProduct.searchParams.set('q', vaule);
    
    const data = await this.loadData(name === '_page' ? vaule : 1);

    if (name === '_page') {
      this.components.cardsList.update(data)
    }

    this.components.cardsList.update(data);
  }
}