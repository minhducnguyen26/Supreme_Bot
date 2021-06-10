var url = window.location.href;

/** What item do you want to buy? */
var category   = "accessories";
var item_name  = "Tees";
var item_color = "White";
var item_size  = "Large";

function pick_catergory() {
    chrome.storage.sync.get("catergory", function(data) {
        var redirect = "https://www.supremenewyork.com/shop/all/jackets";
        var replace = redirect.replace("jackets", category);
        chrome.runtime.sendMessage({redirect: replace});
    });
}

function pick_item() {
    chrome.storage.sync.get ("item_name", function(data) {
        var items = document.getElementsByClassName("name-link");
        var colors = document.getElementsByClassName("name-link");

        /** Choose the item that matches the "item_name" among all items on the page */
        for(var i = 0; i < items.length; i++) {
            if(items[i].innerHTML.includes(item_name))  {
                /** Choose the color that matches the "item_color" among all colors of the designated item */
                for(var j = 0; j < colors.length; i++) {
                    if(colors[i].innerHTML.includes(item_color)) {
                        chrome.runtime.sendMessage({redirect: items[i].href}); 
                        break;
                    }
                }
            break;  
            } 
        }

        /** Choose the item's size
        * This action is delayed until the item's name and color are chosen */
        setTimeout(function() {
            //Get select object
            var objSelect = document.getElementById("s");

            //Set selected
            setSelectedValue(objSelect, item_size);

            function setSelectedValue(selectObj, valueToSet) {
                for (var i = 0; i < selectObj.options.length; i++) {
                    if (selectObj.options[i].text == valueToSet) {
                        selectObj.options[i].selected = true;
                        return;
                    }
                }
            }
        }, 100); 

        /** Add the selected item to the cart
        *  This action is delayed until the size is chosen */
        setTimeout(function() {
            document.getElementsByName("commit")[0].click()
        }, 100);   

        /** Go to check out
        *  This action is delayed until the item is added to the cart */
        setTimeout(function() {
            document.querySelector("#cart > a.button.checkout").click();
        }, 1000); 
    });
}

function check_out() {
    var full_name = "Monkey D. Luffy";
    var email = "strawhats@gmail.com";
    var phone = "4242424242";
    var address = "East Blue";
    var apt = "Apt.100";
    var zip = "10000";
    var city = "New World";
    var state = "KS"
    var country = "USA"; 
    var card_number = "123456789";
    var expiration_month = "12";
    var expiration_year = "2022";
    var CVV = "321";
    
    /** Shipping information */
    document.getElementById("order_billing_name").value = full_name;
    document.getElementById("order_email").value = email;
    document.getElementById("order_tel").value = phone;
    document.getElementById("bo").value = address;
    document.getElementById("oba3").value = apt;
    document.getElementById("order_billing_zip").value = zip;
    document.getElementById("order_billing_city").value = city;
    document.getElementById("order_billing_state").value = state;
    document.getElementById("order_billing_country").value = country;
    
    /** Credit card information */
    document.getElementById("rnsnckrn").value = card_number;
    document.getElementById("credit_card_month").value = expiration_month;
    document.getElementById("credit_card_year").value = expiration_year;
    document.getElementById("orcer").value = CVV;

    /** Process payment */
    document.getElementsByClassName("iCheck-helper")[1].click();
    
    setTimeout(function() {
        document.getElementsByName("commit")[0].click();
    }, 500); 
}

if(url == "https://www.supremenewyork.com/shop/all") {
    pick_catergory();
}

else if(url != "https://www.supremenewyork.com/shop/all") {
    pick_item();
}

if(url == "https://www.supremenewyork.com/checkout") {
    check_out();
}