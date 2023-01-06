import { createSlice } from '@reduxjs/toolkit';
import { GameBoardGenerator } from '../utils/GameBoardGenerator';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        theme: '',
        playersCount: 1,
        boardLength: 0,
        cardsList: [],
        scoresList: [
            {
                playerId: 1,
                points: 0,
                moves: 0
            }
        ],
        currentPlayerId: 1,
        selectedCardsCount: 0
    },
    reducers: {
        startNewGame(state, action) {
            state.theme = action.payload.theme;
            state.playersCount = action.payload.playersCount;
            state.boardLength = action.payload.boardLength;
            state.cardsList = GameBoardGenerator.getInitialCardsList(state.boardLength);
            state.scoresList = GameBoardGenerator.getInitialScores(state.playersCount);
            state.currentPlayerId = 1;
            state.selectedCardsCount = 0;
        },
        selectCard(state, action) {
            const currentCard = state.cardsList.find(card => card.id === action.payload.cardId);
            if (state.selectedCardsCount < 2 && !currentCard.disabled && !currentCard.selected) {
                currentCard.selected = true;
                state.selectedCardsCount++;
                state.scoresList.find(score => score.playerId === state.currentPlayerId).moves++;
            }
        },
        revealCardsIfValidPair(state) {
            if (state.selectedCardsCount === 2) {
                const selectedCards = state.cardsList.filter(card => card.selected === true);
                if (selectedCards[0].value === selectedCards[1].value) {
                    // eslint-disable-next-line array-callback-return
                    selectedCards.map(card => {
                        card.selected = false;
                        card.disabled = true;
                        state.selectedCardsCount--;
                    });
                    state.scoresList.find(score => score.playerId === state.currentPlayerId)
                        .points++;
                } else {
                    // eslint-disable-next-line array-callback-return
                    selectedCards.map(card => {
                        card.selected = false;
                        state.selectedCardsCount--;
                    });
                    const nextScore = state.scoresList.find(
                        score => score.playerId === state.currentPlayerId + 1
                    );
                    if (nextScore) {
                        state.currentPlayerId = nextScore.playerId;
                    } else {
                        state.currentPlayerId = 1;
                    }
                }
            }
        }
    }
});

export const gameActions = gameSlice.actions;

export default gameSlice;
