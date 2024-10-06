import { IAction } from "../types/action";
import { Formatter } from "sarala-json-api-data-formatter";

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

// to use it use const FormatterSingleton = FormatterSingleton.instance;
export class FormatterSingleton {
  private static instance: FormatterSingleton;
  private constructor() {}
  public static getInstance(): FormatterSingleton {
    if (!FormatterSingleton.instance) {
      FormatterSingleton.instance = new FormatterSingleton();
    }
    return FormatterSingleton.instance;
  }
  public async formatData(data: any) {
   const  formatter: any = new Formatter();
    return await formatter.deserialize(data);
  }
}
