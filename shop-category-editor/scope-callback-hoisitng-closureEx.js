function createPercentageDiscount(percent, minSubtotal) {
  return function (cartValue) {
    return cartValue < minSubtotal ? 0 : cartValue * percent / 100;
  }
}

function createFixedDiscount(amount, minSubtotal) {
  return function (value) {
    return value < minSubtotal ? 0 : Math.min(value, amount);
  }
}

function createPricingEngine(discountRule) {
  let quotesCount = 0;
  let totalDiscount = 0;
  function quote(value) {
    const discount = discountRule(value);

    totalDiscount += discount;
    quotesCount++;

    return {
      subtotal: value,
      discount,
      total: value - discount,
    }
  }

  function getStats() {
    return {
      quotesCount,
      totalDiscount
    }
  }

  return {
    quote,
    getStats,
  }
}

const rule = createPercentageDiscount(10, 200);
const shop = createPricingEngine(rule);

console.log(shop.quote(100));
// { subtotal: 100, discount: 0, total: 100 }

console.log(shop.quote(300));
// { subtotal: 300, discount: 30, total: 270 }

console.log(shop.getStats());
// { quotesCount: 2, totalDiscount: 30 }