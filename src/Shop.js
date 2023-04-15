import React, { useState, useEffect } from "react";
import items from "./selected_products.json";
import './Shop.css';


export const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [inCart, cartState] = useState(false);
    const [inCheckOut, checkOutState] = useState(false);
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState('');

    const [orderComplete, orderState] = useState(false);
    

    // window.addEventListener("load", () => {
    //     document.body.classList.add("min-h-screen");
    //     document.body.classList.add(" bulba-green");
    //   });


    //const alertTrigger = document.getElementById('submit-btn')
    
    

    useEffect(() => {
        total();
    }, [cart]);

    function inputCardChange() {
        console.log("hi")
        const inputCard = document.querySelector('#inputCard')
        inputCard.addEventListener('input', event => {
            console.log("hi2")
            if (!inputCard.value) {
                return event.preventDefault() // stops modal from being shown
            } else {
                inputCard.value = inputCard.value.replace(/-/g, '')
                let newVal = ''
                for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
                    if (nums != 0 && nums % 4 == 0) {
                        newVal += '-'
                    }
                    newVal += inputCard.value[i]
                    if (isNumeric(inputCard.value[i])) {
                        nums++
                    }
                }
                inputCard.value = newVal
            }
        })
    }

    useEffect(() => {

    }, [onSubmit]);

    function onSubmit() {
        const form = document.getElementById('checkout-form')
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        form.addEventListener('submit', event => {
            //if (!form.checkValidity()) {
            if (!validate()) {
                alertPlaceholder.innerHTML = ''
                alert('<i className="bi-exclamation-circle"></i> Something went wrong!', 'danger')
            }
            event.preventDefault()
            event.stopPropagation()
            //form.classList.add('was-validated')
        }, false)
    }

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img className="img-fluid bulba-green" src= {process.env.PUBLIC_URL + el.image} width={30} />
            {el.title}
            ${el.price}
        </div>
    ));

    let listItems = ProductsCategory.map((el) => (
        // PRODUCT
        <div className="row border-top border-bottom bulba-green" key={el.id}>
            <div className="row main align-items-center bulba-green">
                <div className="col-2 bulba-green">
                    <img className="img-fluid bulba-green" src= {process.env.PUBLIC_URL + el.image} ></img>
                </div>
                <div className="col bulba-green">
                    <div className="row text-muted bulba-green">{el.title}</div>
                    <div className="row bulba-green">{el.category}</div>
                </div>
                <div className="col bulba-green">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div className="col bulba-green">
                    ${el.price} <span className="close bulba-green">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = items.filter(eachProduct => {
            if (e.target.value === "") {
                console.log('nothing');
                setProductsCategory(items);
                console.log(items);
                return ProductsCategory;
            }
            console.log('change');
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setProductsCategory(results);
    }

    function goToShopping() {
        checkOutState(false);
        cartState(false);
        orderState(false);
    }

    function checkOut() {
        checkOutState(!inCheckOut);
        cartState(inCheckOut);
        orderState(false);

    }

    function goToCart() {
        cartState(!inCart);
        checkOutState(false);
        orderState(false);
    }

    let validate = function () {
        let val = true;
        let email = document.getElementById('inputEmail4')
        let name = document.getElementById('inputName')
        let card = document.getElementById('inputCard')
        const form = document.getElementById('checkout-form')
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const summaryList = document.querySelector('.card > ul')
        const summaryCard = document.querySelector('.card')

        if (!email.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            email.setAttribute("class", "form-control is-invalid");
            val = false;
        }
        else {
            email.setAttribute("class", "form-control is-valid");
            order.email = email.value
        }

        if (name.value.length == 0) {
            name.setAttribute("class", "form-control is-invalid")
            val = false
        }
        else {
            name.setAttribute("class", "form-control is-valid");
            order.name = name.value
        }

        if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
            card.setAttribute("class", "form-control is-invalid")
            val = false
        }
        else {
            card.setAttribute("class", "form-control is-valid");
            order.card = card.value
        }

        if (val) {
            form.classList.add("collapse")

            for (const [key, value] of Object.entries(order)) {
                summaryList.innerHTML += '<li className="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` + '</li>'
            }
            summaryCard.classList.remove("collapse")
            alertPlaceholder.innerHTML = ""
            alert('<i className="bi-cart-check-fill"></i> You have made an order!', 'success')
            orderState(true);
        }
        return val;
    }

    var order = {
        name: '',
        email: '',
        card: ''
    }

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        wrapper.innerHTML = [
            `<div className="alert alert-${type} alert-dismissible" role="alert">`,
            ` <div>${message}</div>`,
            ' <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')
        alertPlaceholder.append(wrapper)
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

   

    return (
        <div>
            STORE SE/ComS319
            <div className="card">
                <div className="row">

                    {inCheckOut && <div>  <div className="container">

                        

                        <div className="row">
                            <div className="col-2"></div>


                            <div className="col-8">

                                <h1>Javascript Form Validation</h1>

                                <div id="liveAlertPlaceholder"></div>

                                <form className="row g-3" id="checkout-form">

                                    {/* Full Name */}
                                    <div className="col-md-6">
                                        <label for="inputName" className="form-label" class="required">Full Name</label>
                                        <input type="text" className="form-control" id="inputName"></input>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Must be like, "John Doe"
                                        </div>
                                    </div>

                                    {/* <!-- Email --> */}
                                    <div className="col-md-6">
                                        <label for="inputEmail4" className="form-label" class="required">Email</label>
                                        <input type="email" className="form-control" id="inputEmail4"></input>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div className="invalid-feedback">
                                            Must be like, "abc@xyz.efg"
                                        </div>
                                    </div>

                                    

                                    {/* <!-- Credit Card --> */}
                                    <div className="col-12">
                                        <label for="inputCard" className="form-label" class="required">Card</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
                                            <input   onChange={() => inputCardChange()} type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                                                aria-label="Username" aria-describedby="basic-addon1"></input>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                            <div className="invalid-feedback">
                                                Must be like, "7777-7777-7777-7777"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label for="inputAddress" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
                                    </div>
                                    <div className="col-12">
                                        <label for="inputAddress2" className="form-label">Address 2</label>
                                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputCity" className="form-label">City</label>
                                        <input type="text" className="form-control" id="inputCity"></input>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputState" className="form-label">State</label>
                                        <select id="inputState" className="form-select">
                                            <option selected>Choose...</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <label for="inputZip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="inputZip"></input>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="gridCheck"></input>
                                            <label className="form-check-label" for="gridCheck">
                                                Check me out
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success" onClick={() => onSubmit()}> <i className="bi bi-bag-check"></i>Order</button>
                                    </div>
                                </form>


                                <div className="card collapse" /* style="width: 18rem;" */>
                                    <div className="card-body">
                                        <h5 className="card-title">Order summary:</h5>
                                        <p className="card-text">Here is a summary of your order.</p>
                                    </div>
                                    <ul className="list-group list-group-flush">

                                    </ul>
                                    <a href="" onClick="location.reload()" className="btn btn-secondary"> <i className="bi-arrow-left-circle"></i>
                                        Return</a>
                                </div>


                                <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
                                    <div className="container py-4 py-md-5 px-4 px-md-3">
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <b>SE/Com-S 319</b> Javascript form validation.
                                            </div>

                                        </div>
                                    </div>
                                </footer>

                            </div>

                            <div className="col-2"></div>


                        </div>

                    </div></div>}

                    {/* HERE, IT IS THE SHOPPING CART */}
                    {!inCheckOut && <div className="col-md-8 cart">
                    <div className="title">
                            <div className="row">
                                <div className="py-10">
                                {(!inCheckOut && !orderComplete && !inCart) && <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />}
                                </div>
                                <div className="col">
                                    <h4>
                                        <b>319 Shopping Cart</b>
                                    </h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    Products selected: {cart.length}
                                </div>
                                <div className="ml-5  p-10 xl:basis-4/5">
                            </div>
                            </div>
                        </div>

                        <div>
                            {(!inCart && !inCheckOut) && listItems}
                            {(inCart) && cartItems}
                        </div>
                    </div>}

                    {inCart && <div className="float-end">
                        {<p className="mb-0 me-5 d-flex align-items-center">
                            {<span className="small text-muted me-2">Order total:</span>}
                            {<span className="lead fw-normal">${cartTotal}</span>}
                        </p>}
                    </div>}
                </div>
            </div>
            {(!inCheckOut && !orderComplete) && <div className="inline-block bg-gray-500 px-3 py-1 text-lg font-semibold mr-2 mt-2" onClick={() => goToCart()}><button>{inCart ? "Return to Shopping" : "Go to Cart"}</button></div>}
            {(inCart || inCheckOut) && !orderComplete && <div className="inline-block bg-green-500 px-3 py-1 text-lg font-semibold mr-2 mt-2" onClick={() => checkOut()}><button>{inCart ? "Check Out" : "Return to Cart"}</button></div>}
            {orderComplete && <div className="inline-block bg-red-500 px-3 py-1 text-lg font-semibold mr-2 mt-2" onClick={() => goToShopping()}><button>Return to Shopping</button></div>}
        </div>
    );
};
export default Shop;