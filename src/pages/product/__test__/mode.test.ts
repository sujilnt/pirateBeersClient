import "jest";
import api from "@/service/api";
import model, {ProductAction} from "../model";
import {setup} from "@/test/helper";
import {Category, Product} from "../../../api";
import {notification} from "antd";


jest.mock("@/service/api");

const products: Product[] = [
  {
    "id": "FceO5R",
    "title": "Equatorial",
    "description": "Hop driven and sessionable. Crafted with a focus on complementing mellow malt sweetness with a tropical hoppy brightness. Truly an ale built for Summer.\nLawn mowed? Grab an Equatorial. Heading to a music festival? Grab an Equatorial. Floating down a river? Grab an Equatorial. You follow?",
    "category": "wheat_ale",
    "image": "https://brewerydb-images.s3.amazonaws.com/beer/FceO5R/upload_fJsFzS-contentAwareMedium.png",
    "rating": 4,
    "price": 5.4,
    "listedSince": "20/02/2020",
    "tags": ["Crisp & Clean", " Malty & Sweet"],
    "abv": 5.2,
    "ibu": 31
  }, {
    "id": "NUGX0p",
    "title": "Equinox",
    "description": "Sunshine in a glass! Equinox is a refreshing wheat lager designed with lazy sunny days in mind. Hazy bright yellow, it’s a smooth and refreshing beer with a light dry finish. Orange and lemon peel are added to the brew kettle for a burst of citrus, along with some ground coriander to give a hint of spice on the end – tantalizingly quaffable!",
    "category": "wheat_ale",
    "image": "https://brewerydb-images.s3.amazonaws.com/beer/NUGX0p/upload_oTdx0D-contentAwareMedium.png",
    "rating": 4,
    "price": 6.2,
    "listedSince": "21/02/2020",
    "tags": ["Crisp & Clean", " Malty & Sweet"],
    "abv": 4.5,
    "ibu": 25
  }
];


describe("Testing products model", ()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Fetch Products", async ()=>{
    const {getState, dispatch} = setup([model]);
    api.products.getAllProducts = jest.fn(()=>Promise.resolve(products));

    await dispatch({
      type: `products/${ProductAction.FETCH_PRODUCTS}`
    });

    expect(api.products.getAllProducts).toBeCalled();
    expect(getState().products.products).toStrictEqual(products);
  });
});
