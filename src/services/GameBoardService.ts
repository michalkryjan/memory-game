import { ICardProps } from '../components/Card';

interface IScore {
    playerNumber: Number;
    score: Number;
}

export class GameBoardService {
    public static getInitialBoard(boardLength: number, onCardSelect: () => {}) {
        const cardsProps = GameBoardService._createCardsProps(boardLength, onCardSelect);
        let shuffledCards = GameBoardService._shuffle(cardsProps);
        let board = GameBoardService._createEmptyBoard(boardLength);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                board[i].push(shuffledCards.pop());
            }
        }
        return board;
    }

    private static _createCardsProps(boardLength: number, onCardSelect: () => {}): ICardProps[] {
        const cards = [];
        const elementsCounter = Math.sqrt(boardLength);
        let currentCardValue = 1;
        for (let i = 1; i <= elementsCounter; i + 2) {
            cards.push({
                id: i,
                value: currentCardValue,
                onSelect: onCardSelect,
                disabled: false,
                selected: false
            } as ICardProps);
            cards.push({
                id: i + 1,
                value: currentCardValue,
                onSelect: onCardSelect,
                disabled: false,
                selected: false
            } as ICardProps);
        }
        return cards;
    }

    private static _shuffle(array: any[]) {
        let shuffledArr = array;
        for (let i = 0; i < 5; i++) {
            let currentIndex = shuffledArr.length;
            let randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [shuffledArr[currentIndex], shuffledArr[randomIndex]] = [
                    shuffledArr[randomIndex],
                    shuffledArr[currentIndex]
                ];
            }
        }
        return shuffledArr;
    }

    private static _createEmptyBoard(boardLength: number) {
        let board = [];
        for (let i = 0; i < boardLength; i++) {
            board.push([]);
        }
        return board;
    }

    public getInitialScores(playersCount: number) {
        const scores = [];
        for (let i = 1; i <= playersCount; i++) {
            scores.push({
                playerNumber: i,
                score: 0
            } as IScore);
        }
        return scores;
    }
}
