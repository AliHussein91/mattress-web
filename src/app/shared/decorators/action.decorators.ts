import { IAction } from '../types/action';

// with-action-utils.decorator.ts
export function WithActionUtils() {
  return function (target: any) {
    Object.assign(target.prototype, actionUtils);
  };
}

// Utility methods
const actionUtils = {
  getAction(item: { actions: { data: IAction[] } }, key: string): IAction {
    if (item && item.actions && item.actions.data && item.actions.data.length) {
      const action = item.actions.data.find((action) => action.key === key);
      return action!;
    } else {
      return {} as IAction;
    }
  },
  hasAction(
    item: { actions: { data: IAction[] } },
    key: string,
  ): boolean | void {
    if (item && item.actions && item.actions.data && item.actions.data.length) {
      const action = item.actions.data.find((action) => action.key === key);
      return !!action;
    }
  },
};
