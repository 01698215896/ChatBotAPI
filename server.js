const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.listen(3000,() => {
    console.log("listening on port 3000");
})

app.use(express.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

app.post("/message", (req, res) => {
    // {prompt : "how are you?"}
  const response = openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.prompt,
    temperature: 0,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  response.then(data=>{
    res.send({message: data.data.choices[0].text})
  }).catch(err=>{res.send({message: err.message});})
});
