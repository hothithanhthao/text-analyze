const countCharOccurences = require("../util");

test("letterCount works with regular strings", async () => {
    const expected = await countCharOccurences("hello 2 times  ");
    expect(expected).toEqual({"e":2,"h":1,"i":1,"l":2,"m":1,"o":1,"s":1,"t":1});
});


