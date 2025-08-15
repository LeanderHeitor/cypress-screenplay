import { Actor } from '../core/Actor';

export class See {
    private question: any;
    private assertion: any;

    constructor(question: any, assertion: any) {
        this.question = question;
        this.assertion = assertion;
    }

    static that(question: any, assertion: any) {
        return new See(question, assertion);
    }

    performAs(actor: Actor) {
        const actual = this.question.answeredBy(actor);
        this.assertion(actual);
    }
}