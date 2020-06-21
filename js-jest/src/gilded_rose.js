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
    if (item.name != ITEM_NAME.SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }
  }

  increaseQuality (item) {
    item.quality = item.quality + 1;
    if (item.name == ITEM_NAME.BACKSTAGE_PASSES) {
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  decreaseQuality (item) {
    if (item.quality > 0) {
      if (item.name != ITEM_NAME.SULFURAS) {
        item.quality = item.quality - 1;
      }
    }
  }

  handleSellDayPassed (item) {
    if (item.name != ITEM_NAME.AGED_BRIE) {
      if (item.name != ITEM_NAME.BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          if (item.name != ITEM_NAME.SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  updateQualityByName (item) {
    if (item.name != ITEM_NAME.AGED_BRIE && item.name != ITEM_NAME.BACKSTAGE_PASSES) {
      this.decreaseQuality(item)
    } else {
      if (item.quality < 50) {
        this.increaseQuality(item)
      }
    }
    
    this.updateSellIn(item)

    if (item.sellIn < 0) {
      this.handleSellDayPassed(item)
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
