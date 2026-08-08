export class Question {
    id: number;
    questionText: string;
    options: string[];

    constructor(id: number, questionText: string, options: string[]) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
    }

    validate(): boolean {
        return this.questionText.length > 0 && this.options.length > 0;
    }

    format(): string {
        return `${this.id}: ${this.questionText} \nOptions: ${this.options.join(', ')}`;
    }
}