const stripe=Stripe('pk_live_51Ksg90JjerZXmgTEGEYGdXlCYPuDtxvogdMXwR1JmZt1Lsar4tYKA2WTto9SdOZwpPZVvF7JN0bvXhYurO2vyIG500BE9IXHuT')
const elements=stripe.elements()

console.log("hi!!")

var style={
    base:{
        color:"#fff"
    }
}

const card=elements.create('card',{style});


window.onload=function(){
    try{
        card.mount('#card-element')
    }catch(e){
        console.log("no checkout on this page")
    }
    const form=document.querySelector('#checkout-form');
    form.addEventListener("submit", handleFormSubmit)

    const errorEl=document.querySelector('#card-errors');
    
    const stripeTokenHandler = token => {
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
        console.log(form)
        form.submit();
    }
    
    form.addEventListener('submit', e => {
        
        
        e.preventDefault();
        stripe.createToken(card).then(res => {
            if (res.error) errorEl.textContent = res.error.message;
            else {
                
                stripeTokenHandler(res.token);
                alert(" for your purchase! You will recieve a confirmation email soon.")
                window.location.href='/'
            }
        })
    })
}





