class Equipment {
  constructor(id, name, dailyRate) {
    this.id = id;
    this.name = name;
    this.dailyRate = dailyRate;
    this.isRented = false;
    this.rentedTo = null;
    this.rentalDays = 0;
  }

  getRentalCost(days) {
    return this.dailyRate * days;
  }

  rent(customer, days) {
    if (this.isRented) return false;

    this.isRented = true;
    this.rentedTo = customer;
    this.rentalDays = days;

    return true;
  }

  returnItem() {
    if (!this.isRented) return false;

    this.isRented = false;
    this.rentedTo = null;
    this.rentalDays = 0;

    return true;
  }
}

class RentalShop {
  constructor() {
    this.equipment = [];
  }

  addEquipment(item) {
    const allEqupimentIds = this.equipment.map(equipment => equipment.id);
    if (allEqupimentIds.includes(item.id)) return false;
    this.equipment.push(item);
    return true;
  }

  rentEquipment(id, customer, days) {
    const item = this.equipment.find(item => item.id === id);

    if (!item) return false;

    const wasAdded = item.rent(customer, days);
    if (wasAdded) return false;

    return true;
  }

  returnEquipment(id) {
    const item = this.equipment.find(item => item.id === id);
    if (!item) return false;

    const result = item.returnItem();
    return result;
  }

  getAvailableEquipment() {
    return this.equipment.filter(item => !item.isRented);
  }
}