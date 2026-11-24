const rawOrders = [
  { id: "101", quantity: "2", unitPrice: "49.90", paid: "true" },
  { id: 102, quantity: 1, unitPrice: "29,50", paid: false },
  { id: "103", quantity: "", unitPrice: "15", paid: "false" },
  { id: 101, quantity: "1", unitPrice: "10", paid: true },
  { id: "104", quantity: "1.5", unitPrice: "20", paid: true },
  { id: "105", quantity: "2", unitPrice: "abc", paid: false },
  { id: "106", quantity: "1", unitPrice: "10", paid: "nie" },
];

console.log(importOrders(rawOrders));

function importOrders(rawOrders) {
  const result = {
    validOrders: [],
    rejectedOrders: [],
    summary: {
      acceptedCount: 0,
      rejectedCount: 0,
      totalValue: 0,
      paidValue: 0
    }
  }

  let row = 1;

  for (const order of rawOrders) {
    const preparedOrder = prepareOrder(order);

    if (!preparedOrder.valid) {
      result.rejectedOrders.push({
        row,
        message: preparedOrder.message,
      })

      result.summary.rejectedCount++;
    } else {
      const validOrdersIds = result.validOrders.map(order => order.id);

      if (validOrdersIds.includes(preparedOrder.order.id)) {
        result.rejectedOrders.push({
          row,
          message: `Zamówienie o ID ${preparedOrder.order.id} zostało już zaimportowane.`
        })
        result.summary.rejectedCount++;
      } else {
        result.validOrders.push(preparedOrder.order);
        result.summary.acceptedCount++;

        if (preparedOrder.order.paid) {
          result.summary.paidValue += preparedOrder.order.total;
        }

        result.summary.totalValue += preparedOrder.order.total;
      }
    }

    row++;
  }


  return result;
}

function prepareOrder(rawOrder) {
  const order = {}

  let id = rawOrder.id;
  let quantity = rawOrder.quantity;
  let unitPrice = rawOrder.unitPrice;
  let paid = rawOrder.paid;


  if (typeof id === "string" && id.trim().length > 0) {
    order.id = id.trim();
  } else if (typeof id === "number" && Number.isInteger(id) && id > 0) {
    order.id = String(id);
  } else {
    return {
      valid: false,
      message: "ID zamówienia jest niepoprawne"
    }
  }

  if (typeof quantity === "string" && quantity.trim().length > 0) {
    quantity = Number(quantity);
  }

  if (Number.isInteger(quantity) && quantity > 0) {
    order.quantity = quantity;
  } else {
    return {
      valid: false,
      message: "Ilość zamówienia jest niepoprawna"
    }
  }

  if (typeof unitPrice === "string" && unitPrice.trim().length > 0) {
    unitPrice = Number(unitPrice.replace(",", "."));
  }

  if (Number.isFinite(unitPrice) && unitPrice > 0) {
    order.unitPrice = unitPrice;
  } else {
    return {
      valid: false,
      message: "Cena jednostkowa jest niepoprawna."
    }
  }


  if (typeof paid === "boolean") {
    order.paid = paid;
  } else if (typeof paid === "string" && paid.trim().length > 0) {
    const normalizedPaid = paid.trim().toLowerCase();

    if (normalizedPaid === "true" || normalizedPaid === "false") {
      order.paid = normalizedPaid === "true" ? true : false;
    } else {
      return {
        valid: false,
        message: "Wartość płantości jest niepoprawna"
      }
    }

  } else {
    return {
      valid: false,
      message: "Wartość płantości jest niepoprawna"
    }
  }

  order.total = order.quantity * order.unitPrice;

  return {
    valid: true,
    order
  };
}