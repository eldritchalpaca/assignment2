import React, { useState, useEffect } from "react";
import items from "./selected_products.json";

export const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [inCart, cartState] = useState(false);
    const [inCheckOut, checkOutState] = useState(false);

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    
    
    const alertTrigger = document.getElementById('submit-btn')
    const summaryCard = document.querySelector('.card')
    const summaryList = document.querySelector('.card > ul')

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
/*         const form = document.getElementById('checkout-form')
        form.addEventListener('submit', event => {
            //if (!form.checkValidity()) {
            if (!validate()) {
                alertPlaceholder.innerHTML = ''
                alert('<i class="bi-exclamation-circle"></i> Something went wrong!', 'danger')
            }
            event.preventDefault()
            event.stopPropagation()
            //form.classList.add('was-validated')
        }, false) */
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
            <img class="img-fluid" src={el.image} width={30} />
            {el.title}
            ${el.price}
        </div>
    ));

    const listItems = items.map((el) => (
        // PRODUCT
        <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
                <div class="col-2">
                    <img class="img-fluid" src={el.image} />
                </div>
                <div class="col">
                    <div class="row text-muted">{el.title}</div>
                    <div class="row">{el.category}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div class="col">
                    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));

    function checkOut() {
        checkOutState(!inCheckOut);
        cartState(inCheckOut);

    }

    function goToCart() {
        cartState(!inCart);
        checkOutState(false);
    }

    let validate = function () {
        let val = true;
        let email = document.getElementById('inputEmail4')
        let name = document.getElementById('inputName')
        let card = document.getElementById('inputCard')
        const form = document.getElementById('checkout-form')

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
                summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` + '</li>'
            }
            summaryCard.classList.remove("collapse")
            alertPlaceholder.innerHTML = ""
            alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
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
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            ` <div>${message}</div>`,
            ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
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
            <div class="card">
                <div class="row">

                    {inCheckOut && <div>  <div class="container">

                        <div class="row">
                            <div class="col-2"></div>


                            <div class="col-8">

                                <h1>Javascript Form Validation</h1>

                                <div id="liveAlertPlaceholder"></div>

                                <form class="row g-3" id="checkout-form">

                                    {/* Full Name */}
                                    <div class="col-md-6">
                                        <label for="inputName" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="inputName"></input>
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div class="invalid-feedback">
                                            Must be like, "John Doe"
                                        </div>
                                    </div>

                                    {/* <!-- Email --> */}
                                    <div class="col-md-6">
                                        <label for="inputEmail4" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="inputEmail4"></input>
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        <div class="invalid-feedback">
                                            Must be like, "abc@xyz.efg"
                                        </div>
                                    </div>

                                    

                                    {/* <!-- Credit Card --> */}
                                    <div class="col-12">
                                        <label for="inputCard" class="form-label">Card</label>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                                            <input   onChange={() => inputCardChange()} type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                                                aria-label="Username" aria-describedby="basic-addon1"></input>
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                            <div class="invalid-feedback">
                                                Must be like, "7777-7777-7777-7777"
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label for="inputAddress" class="form-label">Address</label>
                                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></input>
                                    </div>
                                    <div class="col-12">
                                        <label for="inputAddress2" class="form-label">Address 2</label>
                                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputCity" class="form-label">City</label>
                                        <input type="text" class="form-control" id="inputCity"></input>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="inputState" class="form-label">State</label>
                                        <select id="inputState" class="form-select">
                                            <option selected>Choose...</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="inputZip" class="form-label">Zip</label>
                                        <input type="text" class="form-control" id="inputZip"></input>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                                            <label class="form-check-label" for="gridCheck">
                                                Check me out
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-success" onClick={() => onSubmit()}> <i class="bi-bag-check"></i> Order</button>
                                    </div>
                                </form>


                                <div class="card collapse" /* style="width: 18rem;" */>
                                    <div class="card-body">
                                        <h5 class="card-title">Order summary</h5>
                                        <p class="card-text">Here is a summary of your order.</p>
                                    </div>
                                    <ul class="list-group list-group-flush">

                                    </ul>
                                    <a href="" onClick="location.reload()" class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
                                        Return</a>
                                </div>


                                <footer class="bd-footer py-4 py-md-5 mt-5 bg-light">
                                    <div class="container py-4 py-md-5 px-4 px-md-3">
                                        <div class="row">
                                            <div class="col-lg-12 mb-3">
                                                <b>SE/Com-S 319</b> Javascript form validation.
                                            </div>

                                        </div>
                                    </div>
                                </footer>

                            </div>

                            <div class="col-2"></div>


                        </div>

                    </div></div>}

                    {/* HERE, IT IS THE SHOPING CART */}
                    {!inCheckOut && <div class="col-md-8 cart">
                        <div class="title">
                            <div class="row">
                                <div class="col">
                                    <h4>
                                        <b>319 Shopping Cart</b>
                                    </h4>
                                </div>
                                <div class="col align-self-center text-right text-muted">
                                    Products selected {cart.length}
                                </div>
                            </div>
                        </div>

                        <div>
                            {(!inCart && !inCheckOut) && listItems}
                            {(inCart) && cartItems}
                        </div>

                    </div>}

                    {inCart && <div class="float-end">
                        {<p class="mb-0 me-5 d-flex align-items-center">
                            {<span class="small text-muted me-2">Order total:</span>}
                            {<span class="lead fw-normal">${cartTotal}</span>}
                        </p>}
                    </div>}

                    {inCheckOut && <div>
                        testing
                    </div>}

                </div>
            </div>
            {(!inCheckOut) && <div className="inline-block bg-gray-500 px-3 py-1 text-lg font-semibold mr-2 mt-2" onClick={() => goToCart()}><button>{inCart ? "Return to Shopping" : "Go to Cart"}</button></div>}
            {(inCart || inCheckOut) && <div className="inline-block bg-green-500 px-3 py-1 text-lg font-semibold mr-2 mt-2" onClick={() => checkOut()}><button>{inCart ? "Check Out" : "Return to Cart"}</button></div>}
        </div>
    );
};
export default Shop;

const CheckOut = () => {







 






    return;
};