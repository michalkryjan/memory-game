import { createSlice } from '@reduxjs/toolkit';
import { GameBoardService } from '../services/GameBoardService';

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        currentPlayerId: 1,
        scoresList: [],
        cardsList: [],
        selectedCardsCount: 0
    },
    reducers: {
        startGame(state, action) {
            state.scoresList = GameBoardService.getInitialScores(action.payload.playersCount);
            state.cardsList = GameBoardService.getInitialCardsList(action.payload.boardLength);
        },
        selectCard(state, action) {
            const currentCard = state.cardsList.find(card => card.id === action.payload.cardId);
            const selectedCards = state.cardsList.filter(card => card.selected === true);
            if (selectedCards.length < 2 && !currentCard.disabled && !currentCard.selected) {
                currentCard.selected = true;
                state.selectedCardsCount++;
            }
        },
        revealCardsIfValidPair(state) {
            const selectedCards = state.cardsList.filter(card => card.selected === true);
            if (selectedCards.length === 2) {
                if (selectedCards[0].value === selectedCards[1].value) {
                    // eslint-disable-next-line array-callback-return
                    selectedCards.map(card => {
                        card.selected = false;
                        card.disabled = true;
                        state.selectedCardsCount--;
                    });
                    state.scoresList.find(score => score.playerId === state.currentPlayerId)
                        .value++;
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

export const boardActions = boardSlice.actions;

export default boardSlice;
