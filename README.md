# Faslet Widget

You can add the scripts anywhere in your html, preferable inside the at the bottom of the page. The total size of the
scripts combined is approx 185KB gzipped. In the example script below we use the text ‘Size me up!’ but you can change
this. You could also use an image or icon instead of only text to trigger the Faslet widget.

![Faslet Widget](https://github.com/Faslet/demo/blob/master/docs/demo.png?raw=true)

### Demo

https://faslet.github.io/demo/

## Installation

You can add the scripts anywhere in your html, preferable inside the at the bottom of the page. The total size of the
scripts combined is approx 185KB gzipped. In the example script below we use the text ‘Size me up!’ but you can change
this. You could also use an image or icon instead of only text to trigger the Faslet widget.

## Parameters

_The widget will accept the following parameter:_

| Parameter | Type | Example |
| ------ | ------ | ------ | 
| shop-id | string | demo-shop |
| product | string | t-shirt |
| product-name | string | Nice t-shirt blue |
| product-image | string | https://ibb.co/kBxS8XM |
| product-url | string | https://shop.com/add-to-card | 
| product-gender | string | male | 

## Installation

Place the widget where you want it to be visible.

```js
<faslet-app
    shop-id="myShop"
    product="sweater"
    product-name="NiceSweater"
    product-image="https://image.jpg"
    product-url="https://shop.com/product"
    product-gender="female"
>
    Size me up!
</faslet>
```

The script can be anywhere in the page:

```js
<script src="https://unpkg.com/vue"></script>
<script src="https://faslet-prod.web.app/faslet-app.min.js"></script>
```

### Add to cart

The widget requires that your application expose a global method in order to add products to the cart. Attributes can be
passed to widget such as id, name, etc.

```html

<script>
    // On global scope
    function addCart() {
        // Your shop implementation to add a product to the card
    }
</script>
```

As an alternative you can specify the `product-url` property. That will be used when the user clicks on `add to cart`. 
