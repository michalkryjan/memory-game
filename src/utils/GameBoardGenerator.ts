import {
    faMugHot,
    faUmbrella,
    faHippo,
    faPaperclip,
    faCarSide,
    faBell,
    faGhost,
    faGift,
    faPlane,
    faSnowflake,
    faFish,
    faBicycle,
    faCrown,
    faPuzzlePiece,
    faYinYang,
    faScissors,
    faRadiation,
    faPhoneFlip
} from '@fortawesome/free-solid-svg-icons';
import { ICardProps } from '../components/Card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
        const cards = this.__createCards(boardLength);
        return this.__shuffle(this.__shuffle(cards));
    }

    private static __createCards(boardLength: number): ICardProps[] {
        const cards = [];
        const elementsCounter = Math.pow(boardLength, 2);
        let availableIcons = this.__getFontAwesomeIcons();
        let currentCardValue = 1;
        for (let i = 1; i < elementsCounter + 1; i += 2) {
            const icon = availableIcons.pop();
            cards.push({
                id: i,
                value: currentCardValue,
                icon: icon,
                disabled: false,
                selected: false
            } as ICardProps);
            cards.push({
                id: i + 1,
                value: currentCardValue,
                icon: icon,
                disabled: false,
                selected: false
            } as ICardProps);
            currentCardValue += 1;
        }
        return cards;
    }

    private static __getFontAwesomeIcons(): IconProp[] {
        return [
            faMugHot,
            faUmbrella,
            faHippo,
            faPaperclip,
            faCarSide,
            faBell,
            faGhost,
            faGift,
            faPlane,
            faSnowflake,
            faFish,
            faBicycle,
            faCrown,
            faPuzzlePiece,
            faYinYang,
            faScissors,
            faRadiation,
            faPhoneFlip
        ];
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
