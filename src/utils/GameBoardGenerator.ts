import { ICardProps } from '../components/Card';

export interface IScore {
    playerId: number;
    points: number;
    moves: number;
}

export class GameBoardGenerator {
    public static getInitialScores(playersCount: number): IScore[] {
        const scores = [];
        for (let i = 1; i <= playersCount; i++) {
            scores.push({
                playerId: i,
                points: 0,
                moves: 0
            } as IScore);
        }
        return scores;
    }

    public static getInitialCardsList(boardLength: number): ICardProps[] {
        const cards = this.createCards(boardLength);
        return this.__shuffle(cards);
    }

    private static createCards(boardLength: number): ICardProps[] {
        const cards = [];
        const elementsCounter = Math.pow(boardLength, 2);
        let currentCardValue = 1;
        for (let i = 1; i < elementsCounter + 1; i += 2) {
            cards.push({
                id: i,
                value: currentCardValue,
                disabled: false,
                selected: false
            } as ICardProps);
            cards.push({
                id: i + 1,
                value: currentCardValue,
                disabled: false,
                selected: false
            } as ICardProps);
            currentCardValue += 1;
        }
        return cards;
    }

    private static __shuffle(array: any[]): any[] {
        let shuffledArray = array;
        for (let i = 0; i < 5; i++) {
            let currentIndex = shuffledArray.length;
            let randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
                    shuffledArray[randomIndex],
                    shuffledArray[currentIndex]
                ];
            }
        }
        return shuffledArray;
    }
}
