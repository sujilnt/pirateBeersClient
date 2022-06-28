import "jest";
import api from "@/service/api";
import model, {CategoryAction} from "../model";
import {setup} from "@/test/helper";
import {Category} from "../../../api";
import {notification} from "antd";

jest.mock("@/service/api");
/**
 * Tests related to category model
 */

const categories: Category[] = [
  {
    title: "Ale",
    id: "wheat_ale",
    description: "American wheat beers are some of the most approachable beers in the craft beer " +
      "world, and the versatility of wheat beer allows it " +
      "to be combined with a variety of ingredients or enjoyed on its own alongside a wide variety of food options. " +
      "The sizable portion of wheat malt used to brew wheat beer lends a lighter, " +
      "distinctive experience compared to beers brewed with barley exclusively.\n",
    url: "/categories/wheat_ale",
    image: "https://www.craftbeer.com/wp-content/uploads/_SF/thumbnails/american-wheat.jpg",
    abv: {min: 3.5, max: 5.5},
    ibu: {min: 10, max: 35},
    srm: {min: 4, max: 10},
    // in degree celsius
    servingTemperature: {min: 4, max: 7},
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
    abv: {min: 4, max: 6},
    ibu: {min: 17, max: 30},
    srm: {min: 3, max: 6},
    servingTemperature: {min: 4, max: 7},
  },
]

describe("Tests related Products model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should fetch all product categories ${CategoryAction.FETCH_PRODUCT_CATEGORY}`, async () => {
    const {getState, dispatch} = setup([model]);
    api.products.getAllProductCategories = jest.fn(() => Promise.resolve(categories));

    await dispatch({
      type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
    });

    expect(api.products.getAllProductCategories).toBeCalled();
    expect(getState().productCategory.productCategories).toStrictEqual(categories);
  });


  it("should not fetch categories due to error and notify the error", async () => {
    const {getState, dispatch} = setup([model]);
    api.products.getAllProductCategories = jest.fn(() =>
      Promise.reject(new Error("could not fetch category information")
      ));
    notification.error = jest.fn();

    await dispatch({
      type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORIES}`
    });

    expect(api.products.getAllProductCategories).toBeCalled();
    expect(notification.error).toBeCalledWith({
      message: "Could not fetch category information"
    })
    expect(getState().productCategory.productCategories).toStrictEqual(undefined);
  })


  it("should fetch single category", async () => {
    const {getState, dispatch} = setup([model]);
    api.products.getCategoryById = jest.fn(() => Promise.resolve([categories[1]]));

    await dispatch({
      type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORY}`,
      id: "pilsener"
    });

    expect(api.products.getCategoryById).toBeCalledWith({
      id: "pilsener"
    });
    expect(getState().productCategory.category).toStrictEqual(categories[1]);
  });


  it("should not fetch categories due to error and notify the error", async () => {
    const {getState, dispatch} = setup([model]);
    api.products.getCategoryById = jest.fn(() =>
      Promise.reject(new Error("Could not fetch category information")
      ));

    notification.error = jest.fn();

    await dispatch({
      type: `productCategory/${CategoryAction.FETCH_PRODUCT_CATEGORY}`,
      id: "pilsener"
    });

    expect(api.products.getCategoryById).toBeCalledWith({
      id: "pilsener"
    });
    expect(notification.error).toBeCalledWith({
      message: "Could not fetch category information"
    })
    expect(getState().productCategory.category).toStrictEqual(undefined);
  });
});
