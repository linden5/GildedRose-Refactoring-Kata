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
    if (item.name == ITEM_NAME.BACKSTAGE_PASSES) {
      this.updateBackstagePasses(item);
    } else {
      this.updateAgedBrie(item);
    }
  }

  updateAgedBrie (item) {
    this.updateQualityValue(item, 1);
  }

  updateBackstagePasses (item) {
    this.updateQualityValue(item, 1);
    if (item.sellIn < 11) {
      this.updateQualityValue(item, 1);
    }
    if (item.sellIn < 6) {
      this.updateQualityValue(item, 1);
    }
  }

  decreaseQuality (item) {
    if (item.name != ITEM_NAME.SULFURAS) {
      this.updateQualityValue(item, -1);
    }
  }

  handleSellDayPassed (item) {
    if (item.sellIn < 0) {
      if (item.name === ITEM_NAME.AGED_BRIE) {
        this.handleSellDayPassedAgedBrie(item);
      } else if (item.name === ITEM_NAME.BACKSTAGE_PASSES) {
        this.handleSellDayPassedBackStagePasses(item);
      } else {
        this.handleSellDayPassedNormal(item);
      }
    }
  }

  handleSellDayPassedAgedBrie (item) {
    this.updateQualityValue(item, 1);
  }

  handleSellDayPassedBackStagePasses (item) {
    this.updateQualityValue(item, -item.quality);
  }

  handleSellDayPassedNormal (item) {
    if (item.name != ITEM_NAME.SULFURAS) {
      this.updateQualityValue(item, -1);
    }
  }

  updateQualityValue (item, value) {
    if (value !== 0) {
      let newValue = item.quality + value;
      if (newValue > 50) {
        newValue = 50;
      } else if (newValue < 0) {
        newValue = 0;
      }

      item.quality = newValue;
    }
  }

  updateQualityByName (item) {
    if (item.name != ITEM_NAME.AGED_BRIE && item.name != ITEM_NAME.BACKSTAGE_PASSES) {
      this.decreaseQuality(item)
    } else {  
      this.increaseQuality(item)
    }
    
    this.updateSellIn(item)

    this.handleSellDayPassed(item)
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
