const {Shop, Item, ITEM_NAME} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should test empty constructor", function() {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).toBe(0);
  });

  it("should keep the quality to be 0 for 0 quality", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("should descrease quality by 1 for normal items", function() {
    const gildedRose = new Shop([new Item("any", 50, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(39);
  });

  it("should descrease quality by 2 if sellIn is passed, for normal items", function() {
    const gildedRose = new Shop([new Item("any", 0, 40)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(38);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(36);
  });

  it("should keep sellIn and quality unchanged for Sulfuras, Hand of Ragnaros", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.SULFURAS, 50, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(50);
    expect(items[0].quality).toBe(80);
  });

  it("should keep sellIn and quality unchanged for Sulfuras, Hand of Ragnaros if sell day passed", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.SULFURAS, -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(80);
  });

  it("should increase quality of Aged Brie the older it gets", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.AGED_BRIE, 50, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(21);
  });

  it("should increase quality of Aged Brie twice if sell day is passed", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.AGED_BRIE, 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(22);
  });

  it("should not increase quality of Aged Brie to more than 50", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.AGED_BRIE, 50, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(50);
  });

  it("should not increase quality of Aged Brie to more than 50 if sell day passed", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.AGED_BRIE, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(50);
  });

  it("should increase quality of Backstage passes the older it gets", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 50, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(21);
  });

  it("should keep quality of Backstage passes if it is 50", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 50, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(49);
    expect(items[0].quality).toBe(50);
  });

  it("should increase quality of Backstage passes by 2 when 10 days or less", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22);
  });

  it("should not increase quality of Backstage passes by 2 when 10 days or less if quality >= 50", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(50);
  });

  it("should increase quality of Backstage passes by 3 when 5 days or less", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23);
  });

  it("should increase quality of Backstage passes by 3 when 5 days or less  if quality >= 50", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 5, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  it("should drop the quality of Backstage passes to 0 after the concert", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.BACKSTAGE_PASSES, 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("should decrease quality of conjured item by 2", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.CONJURED, 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(19);
    expect(items[0].quality).toBe(18);
  });

  it("should decrease quality of conjured item by 4 if passed sell day", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.CONJURED, 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(16);
  });

  it("should decrease quality of conjured item but not below 0", function() {
    const gildedRose = new Shop([new Item(ITEM_NAME.CONJURED, 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
});
