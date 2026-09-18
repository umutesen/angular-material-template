export class Locale {
    public value: string;

    constructor(value: string | undefined) {
        this.value = value ? value : 'en-US';
    }
}
