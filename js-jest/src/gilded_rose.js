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

  updateSellIn(i) {
    if (this.items[i].name != ITEM_NAME.SULFURAS) {
      this.items[i].sellIn = this.items[i].sellIn - 1;
    }
  }

  increaseQuality (i) {
    this.items[i].quality = this.items[i].quality + 1;
    if (this.items[i].name == ITEM_NAME.BACKSTAGE_PASSES) {
      if (this.items[i].sellIn < 11) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
      if (this.items[i].sellIn < 6) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }
  }

  decreaseQuality (i) {
    if (this.items[i].quality > 0) {
      if (this.items[i].name != ITEM_NAME.SULFURAS) {
        this.items[i].quality = this.items[i].quality - 1;
      }
    }
  }

  handleSellDayPassed (i) {
    if (this.items[i].name != ITEM_NAME.AGED_BRIE) {
      if (this.items[i].name != ITEM_NAME.BACKSTAGE_PASSES) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != ITEM_NAME.SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        this.items[i].quality = this.items[i].quality - this.items[i].quality;
      }
    } else {
      if (this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1;
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != ITEM_NAME.AGED_BRIE && this.items[i].name != ITEM_NAME.BACKSTAGE_PASSES) {
        this.decreaseQuality(i)
      } else {
        if (this.items[i].quality < 50) {
          this.increaseQuality(i)
        }
      }
      
      this.updateSellIn(i)

      if (this.items[i].sellIn < 0) {
        this.handleSellDayPassed(i)
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  ITEM_NAME
}
