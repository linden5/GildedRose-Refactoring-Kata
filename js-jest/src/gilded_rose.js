class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM_NAME = {
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  AGED_BRIE: 'Aged Brie',
  CONJURED: 'Conjured'
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }

  updateQualityValue (item, value) {
    let newValue = item.quality + value;
    if (newValue > 50) {
      newValue = 50;
    } else if (newValue < 0) {
      newValue = 0;
    }

    item.quality = newValue;
  }

  updateAgedBrie (item) {
    this.updateQualityValue(item, 1);
    this.updateSellIn(item);

    if (item.sellIn < 0) {
      this.updateQualityValue(item, 1);
    }
  }

  updateBackstagePasses (item) {
    this.updateQualityValue(item, 1);
    if (item.sellIn < 11) {
      this.updateQualityValue(item, 1);
    }
    if (item.sellIn < 6) {
      this.updateQualityValue(item, 1);
    }

    this.updateSellIn(item);

    if (item.sellIn < 0) {
      this.updateQualityValue(item, -item.quality);
    }
  }

  updateNormalItem (item, value) {
    this.updateQualityValue(item, value);
    this.updateSellIn(item);
    if (item.sellIn < 0) {
      this.updateQualityValue(item, value);
    }
  }

  updateQualityByName (item) {
    if (item.name == ITEM_NAME.BACKSTAGE_PASSES) {
      this.updateBackstagePasses(item);
    } else if (item.name === ITEM_NAME.AGED_BRIE) {
      this.updateAgedBrie(item);
    } else if (item.name === ITEM_NAME.CONJURED) {
      this.updateNormalItem(item, -2);
    } else if (item.name !== ITEM_NAME.SULFURAS) {
      this.updateNormalItem(item, -1);
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      this.updateQualityByName(item)
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  ITEM_NAME
}
