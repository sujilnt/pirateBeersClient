import type {Request, Response} from 'express';
import {Category, Product} from "@/api";
import productData from "./dummyData.ts";


export let products:Product[] = productData.map((product)=>{
  return{
    id: product.id,
    title: product.displayName,
    description: product.product_description,
    category: product.product_category,
    icon: product.icon,
    image: product.contentAwareMedium,
    rating: 3,
    price: product.product_price,
    listedSince: product.listed_since,
    type: product.type,
    tags: product.product_tags.split(","),
    abv: product.abv,
    ibu: product.ibu,
    srm: product.srm,
  }
});




const categories: Category[] = [{
  title: "Ale",
  id: "wheat_ale",
  description: "American wheat beers are some of the most approachable beers in the craft beer " +
    "world, and the versatility of wheat beer allows it " +
    "to be combined with a variety of ingredients or enjoyed on its own alongside a wide variety of food options. " +
    "The sizable portion of wheat malt used to brew wheat beer lends a lighter, " +
    "distinctive experience compared to beers brewed with barley exclusively.\n",
  url: "/categories/wheat_ale",
  image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/american-wheat.jpg",
  abv:{ min: 3.5, max: 5.5 },
  ibu:{ min: 10 , max: 35 },
  srm:{ min:4, max:10 },
  // in degree celsius
  servingTemperature:{ min:4, max:7 },
},
  {
    title: "Pilsener",
    id: "pilsener",
    description: "The original hoppy, pale beer style, pilseners offer clean, bready maltiness and" +
      " plenty of hop character. Classic interpretations can be traced back to areas of Germany and what is" +
      " now the Czech Republic. When exploring this style, take note of the fuller-bodied bohemian styles " +
      "reminiscent of Czech versions," +
      " compared to the thinner German interpretations--these characteristics are " +
      "mostly attributed to the water character of each region.\n",
    url: "/categories/pilsener",
    image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/bohemian-style-pilsener.jpg",
    abv:{ min: 4, max: 6 },
    ibu:{ min: 17 , max: 30 },
    srm:{ min:3, max:6 },
    servingTemperature:{ min:4, max:7 },
  },
  {
   title: "Stout",
   id: "stout",
   description: "Dry stout is black beer with a dry-roasted character thanks to the use of roasted barley. " +
     "The emphasis on coffee-like roasted barley and a moderate degree of roasted malt aromas define much of the character. " +
     "Hop bitterness is medium to medium high. This beer is often dispensed via nitrogen gas taps that lend a smooth," +
     " creamy body to the palate.\n",
   url: "/categories/stout",
   image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/american-imperial-stout.jpg",
    abv:{ min: 5.7, max: 12 },
    ibu:{ min: 15 , max: 60 },
    srm:{ min:20, max:40 },
    servingTemperature:{ min:4, max:7 },
  },
  {
   title: "Lager",
   id: "lager",
   description: "American lager has little in the way of hop and malt character. " +
     "A straw to gold, very clean and crisp, highly carbonated lager.",
   url: "/categories/lager",
    image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/vienna-style-lager.jpg",
    ibu:{ min: 5, max: 30 },
    abv:{ min: 3.5 , max: 60 },
    srm:{ min:20, max:40 },
    servingTemperature:{ min:8, max:12 },
  },
  {
    title: "Porter",
    id: "porter",
   description: "This longstanding style can be traced back to the working class of the 1700s an" +
     "d its popularity with street and river porters. A porter is dark in color with flavors of chocolate, " +
     "light coffee, nut and caramel. Porters are less roasty and espresso-like than stouts, but have deeper" +
     " cocoa flavors than brown ales. " +
     "Porters are a great beer to have with a wide variety of foods, and a favorite among many craft brewers and their fans.\n",
    url: "/categories/porter",
    image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/american-imperial-porter.jpg",
    ibu:{ min: 5, max: 30 },
    abv:{ min: 3.5 , max: 60 },
    srm:{ min:20, max:40 },
    servingTemperature:{ min:8, max:12 },
  }];



export default {
  'GET /products/categories/:id':(request:Request, response: Response) => {
    const id = request.url.split("/categories/")[1];
    setTimeout(()=>{
      response.send(categories.filter((category)=> category.id=== id));
    },1000);
  },
  'GET /products/categories': (request: Request, response: Response) => {
    setTimeout(() => {
      response.send(categories);
    }, 1000);
  },

  'GET /products/:id': (request: Request, response: Response) => {
    const id = request.url.split("/products/")[1];
    setTimeout(()=>{
      response.send(products.find((product)=> {
        return product.id === id;
      }));
    },1000);
  },
  'GET /products': (request: Request, response: Response) => {
    setTimeout(()=>{
      response.send(products);
    },1000);
  },
  'Delete /products': (request:Request, response: Response) => {
    setTimeout(()=>{
      products= products.filter((product)=>
        !request.query.ids.includes(product.id)
      );
      response.send(200);
    });
  }


}
