const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const countCharOccurences = require("./util");
const port = process.env.PORT || 3200;

//Middle ware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const texts = [{"textLength":{"withSpaces":15,"withoutSpaces":11},"wordCount":3,"characterCount":[{"e":2,"h":1,"i":1,"l":2,"m":1,"o":1,"s":1,"t":1}]}];

/**
 * creating a New order
 */

app.post("/new_text", (req, res) => {
  const new_text = req.body;
  let result = {};
  if(new_text.text){
    result = analyseReceivedText(new_text.text);
    texts.push({...result});
    res.status(200).json({result});
  } else {
    res.status(401).json({
      message: "Invalid text creation"
    });
  }
});

function analyseReceivedText(text) {
  let text_obj = {};
  let lengthText_obj = {};
  let charCount_arr = [];
  charCount_arr.push(countCharOccurences(text));
  lengthText_obj.withSpaces = text.length;
  lengthText_obj.withoutSpaces = text.replace(/ /g,'').length;
  text_obj.textLength = lengthText_obj;
  text_obj.wordCount = text.trim().split(' ').length;
  text_obj.characterCount = charCount_arr;
  return text_obj;
}

/**
 *  Getting All orders
 */

app.get("/get_texts", (req, res) => {
  res.status(200).send(texts);
});

app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

module.exports = app;