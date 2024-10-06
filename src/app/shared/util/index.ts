import { IAction } from "../types/action";

export class ActionsUtilties{

    getAction: any = (
    item: { actions: { data: IAction[] } },
    key: string
  ): IAction  => {
    if (item && item.actions && item.actions.data && item.actions.data.length) {
      const action = item.actions.data.find((action) => action.key === key);
      return action!;
    } else {
      return {} as IAction;
    }
  };
      hasAction: any = (
    item: { actions: { data: IAction[] } },
    key: string
  ): boolean | void => {
    if (item && item.actions && item.actions.data && item.actions.data.length) {
      const action = item.actions.data.find((action) => action.key === key);
      return !!action;
    }
  };
}