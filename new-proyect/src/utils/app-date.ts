export class AppDate extends Date {
    constructor(date?: string | number | Date | undefined) {
        if (date) super(date);
        else super();
    }

    toMYSQLDatetime() {
        return this.toISOString().slice(0, 19).replace('T', ' ');
    }

    toMYSLQDate() {
        return this.toISOString().slice(0, 10);
    }
}
