import { createSlice } from '@reduxjs/toolkit';
import { GameBoardService } from '../services/GameBoardService';

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        currentPlayerId: 1,
        scoresList: [],
        cardsList: []
    },
    reducers: {
        startGame(state, action) {
            state.scoresList = GameBoardService.getInitialScores(action.payload.playersCount);
            state.cardsList = GameBoardService.getInitialCardsList(action.payload.boardLength);
        },
        selectCard(state, action) {
            const currentCardId = action.payload.cardId;

            const currentCard = state.cardsList.find(card => card.id === currentCardId);
            const previousCard = state.cardsList.find(card => card.selected === true);
            currentCard.selected = true;

            if (previousCard) {
                if (previousCard.value === currentCard.value) {
                    previousCard.selected = false;
                    previousCard.disabled = true;
                    currentCard.selected = false;
                    currentCard.disabled = true;
                    state.scoresList.find(score => score.playerId === state.currentPlayerId)
                        .value++;
                } else {
                    previousCard.selected = false;
                    currentCard.selected = false;
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
