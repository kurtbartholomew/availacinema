module.exports = {
    createConfirmationTemplate(confirmKeyword, unsubscribeKeyword) {
        return `Confirm receiving texts from AvailaCinema by responding with ${confirmKeyword}
                If not, respond with ${unsubscribeKeyword}`;
    },
    createVerificationTemplate(unsubscribeKeyword) {
        return `Confirmed phone number. You will now start receiving texts about movies matching your criteria. 
                Respond with ${unsubscribeKeyword} to unsubscribe.`;
    },
    createUnsubscribeTemplate() {
        return 'Sorry to see you go. Thanks for trying AvailaCinema';
    },
    createSuggestionsTemplate(isDaily, date, suggestions, unsubscribeKeyword) {
        const dateStr = (isDaily ? 'released today, ': 'in the week of ') + date;
        const suggestionsText = suggestions.reduce((currentSuggestions, suggestion)=>{
            currentSuggestions+=` - Title: ${suggestion.title} Rating: ${suggestion.rating}`;
            return currentSuggestions;
        },"");
        return `Suggestions of movies to check out ${dateStr}.
                ${suggestionsText}
                Respond with ${unsubscribeKeyword} to unsubscribe.`
    }
}