import {DataType} from "../../model/data-type";

export class TableColumn {
    code: string;
    label: string;
    type: DataType;

    constructor(code: string, label: string, type: DataType = DataType.TEXT) {
        this.code = code;
        this.label = label;
        this.type = type;
    }
}
