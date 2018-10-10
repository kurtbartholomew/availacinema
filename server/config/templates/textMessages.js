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
        const introString = `Suggestions of movies to check out ${dateStr}.\n`;
        const textBodies = suggestions.reduce((currentSuggestions, suggestion)=>{
            let suggestionText = ` - Title: ${suggestion.title} Rating: ${suggestion.rating}`;
            currentSuggestions = _concatenateOrAppendIfOver140Characters(currentSuggestions, suggestionText)
            return currentSuggestions;
        }, [introString]);

        const unsubscribeText = `\nRespond with ${unsubscribeKeyword} to unsubscribe.`;
        textBodies = _concatenateOrAppendIfOver140Characters(textBodies, unsubscribeText);
        return textBodies;
    }
}

function _concatenateOrAppendIfOver140Characters(textArr, additionalText) {
    const lastEntryIdx = textArr.length - 1;
    const latestTextBody = textArr[lastEntryIdx];
    if((latestTextBody.length + additionalText.length) > 140) {
        textArr.push(additionalText);
    } else {
        textArr[lastEntryIdx] = latestTextBody + additionalText;
    }
    return textArr;
}