const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const SuggestionService = require('../../services/SuggestionService');
const EmailMessageService = require('../../services/EmailMessageService');
const UserFilter = require('../../models/UserFilter');
const Suggestion = require('../../models/Suggestion');


describe('Suggestion Service', () => {
    describe('getAndSendSuggestionsToUser', () => {
        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should throw an error if not passed a user id', async () => {
            let error;
            try {
                await SuggestionService.getAndSendSuggestionsToUser();
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error.toString(),/Missing user id/);
        });

        it('should throw an error if no filters are retrieved', async () => {
            this.sandbox.replace(UserFilter, 'findByUserId', function () { return [] });
            let error;
            try {
                await SuggestionService.getAndSendSuggestionsToUser(72,'someone@gmail.com',true);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error, /No filters exist/);
        });

        it('should throw an error if lacking a rating filter', async () => {
            this.sandbox.replace(UserFilter, 'findByUserId', () => [
                {type:UserFilter.TYPE.GENRE,value:43}
            ]);
            let error;
            try {
                await SuggestionService.getAndSendSuggestionsToUser(72,'someone@gmail.com',true);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error, /No rating filter exists/);
        });

        it('should throw an error if lacking genre filters', async () => {
            this.sandbox.replace(UserFilter, 'findByUserId', () => [
                { type: UserFilter.TYPE.RATING, value: 4.3 }
            ]);
            let error;
            try {
                await SuggestionService.getAndSendSuggestionsToUser(72,'someone@gmail.com',true);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
            assert.match(error, /No genre filters exist/);
        });

        it('should not send movie suggestions email if no matching movies found', async () => {
            this.sandbox.replace(UserFilter, 'findByUserId', () => [
                { type: UserFilter.TYPE.RATING, value: 4.3 },
                { type: UserFilter.TYPE.GENRE, value: 79384 }
            ]);
            const findMoviesMatchingUserFiltersFake = sinon.fake.returns([]);
            this.sandbox.replace(SuggestionService.utils, 'findMoviesMatchingUserFilters', findMoviesMatchingUserFiltersFake);
            const addAllFake = sinon.fake.returns(true);
            this.sandbox.replace(Suggestion, 'addAll', addAllFake);
            const queueSuggestionsEmailFake = sinon.fake.returns(true);
            this.sandbox.replace(EmailMessageService, 'queueSuggestionsEmail', queueSuggestionsEmailFake);

            await SuggestionService.getAndSendSuggestionsToUser(72,'someone@gmail.com',true);

            assert.equal(addAllFake.callCount, 0);
            assert.equal(queueSuggestionsEmailFake.callCount, 0);
        });

        

        it('should attempt to send a movie suggestions email if matches found', async () => {
            this.sandbox.replace(UserFilter, 'findByUserId', () => [
                { type: UserFilter.TYPE.RATING, value: 4.3 },
                { type: UserFilter.TYPE.GENRE, value: 79384 }
            ]);
            const findMoviesMatchingUserFiltersFake = sinon.fake.returns([
                {title:"Dracula", rating: 8.9, id: 73452},
                {title:"Honey, I Shrunk The Kids", rating: 3.5, id: 9243}
            ]);
            this.sandbox.replace(SuggestionService.utils, 'findMoviesMatchingUserFilters', findMoviesMatchingUserFiltersFake);
            const addAllFake = sinon.fake.returns(true);
            this.sandbox.replace(Suggestion, 'addAll', addAllFake);
            const queueSuggestionsEmailFake = sinon.fake.returns(true);
            this.sandbox.replace(EmailMessageService, 'queueSuggestionsEmail', queueSuggestionsEmailFake);

            await SuggestionService.getAndSendSuggestionsToUser(72,'someone@gmail.com',true);

            assert.equal(addAllFake.callCount, 1);
            assert.equal(queueSuggestionsEmailFake.callCount, 1);
        });
    });
});