export class Card {

    constructor(id, name, question, answer, questionImage, answerImage) {
        // If cardObject is provided, use its properties, otherwise use individual parameters
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            const cardObject = arguments[0];
            id = cardObject.id;
            name = cardObject.name;
            question = cardObject.question;
            answer = cardObject.answer;
            questionImage = cardObject.questionImage;
            answerImage = cardObject.answerImage;
        }
        
        if (name.trim().length === 0) {
            throw new Error("Card must have a name");
        }
        
        this.id = id;
        this.name = name;
        this.question = question;
        this.answer = answer;
        this.questionImage = questionImage;
        this.answerImage = answerImage;
    }
}