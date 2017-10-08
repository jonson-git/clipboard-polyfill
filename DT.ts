import {DataType, DataTypeLookup} from "./DataType"

export default class DT {
  private m: Map<string, string> = new Map<string, string>();

  public setData(type: string, value: string): void {
    if (!(DataTypeLookup.has(type))) {
      (console.warn || console.log).call(console, "[clipboard.js] Unknown data type: " + type);
    }

    this.m.set(type, value);
  }

  public getData(type: string): string | undefined {
    return this.m.get(type);
  }

  // TODO: Provide an iterator consistent with DataTransfer.
  public forEach(f: (value: string, key: string) => void): void {
    return this.m.forEach(f);
  }

  public static fromText(s: string): DT {
    var dt = new DT();
    dt.setData(DataType.TEXT_PLAIN, s);
    return dt;
  }

  public static fromObject(obj: {[key:string]:string}): DT {
    var dt = new DT();
    for (var key in obj) {
      dt.setData(key, obj[key]);
    }
    return dt;
  }

  public static fromElement(e: HTMLElement): DT {
    var dt = new DT();
    dt.setData(DataType.TEXT_PLAIN, e.innerText);
    dt.setData(DataType.TEXT_HTML, new XMLSerializer().serializeToString(e));
    return dt;
  }
}
