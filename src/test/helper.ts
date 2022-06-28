/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore Could not find a declaration file for module 'dva-immer'
import dvaImmer from 'dva-immer';
import dva, { Model } from 'dva';
import { Store } from 'redux';
import merge from 'deepmerge';
import { GlobalState } from '@/service/interfaces';
/*
 * To setup a test using models with some inital state there are two options.
 * 1. edit each model's state before setup
 * 2. pass in an initialState object.
 * Option 2 (initialState) will override any default state from the models.
 */

export function setup(
  models: Model[],
  initialState?: any /* subset of GlobalState */,
): Store<GlobalState> {
  const app = dva({ initialState });
  app.use(dvaImmer());
  models.forEach((m) => app.model(m));
  app.router(jest.fn());
  app.start();
  // @ts-ignore: Property '_store' does not exist on type 'DvaInstance'.
  // eslint-disable-next-line no-underscore-dangle
  return app._store;
}

/*
 * Useful when you want to test a single effect that calls other effects (with `put`).
 * We don't want to test the side effect as well.
 * By replacing it with a mock we can just check it was called as expected.
 *
 * It returns a copy of the model.
 */
export function mockEffectsExcept(model: Model, effectExcept?: string): Model {
  const modelCopy = merge({}, model);

  Object.keys(modelCopy.effects)
    .filter((effect: string) => effect !== effectExcept)
    .forEach((effect: string) => {
      if (typeof modelCopy.effects[effect] === 'function') {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        modelCopy.effects[effect] = jest.fn();
      } else {
        // with props, eg poll
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        modelCopy.effects[effect][0] = jest.fn();
      }
    });

  return modelCopy;
}

// mockEffects() : Function that mocks all effects for the particular state
export function mockEffects(model: Model): Model {
  return mockEffectsExcept(model);
}
