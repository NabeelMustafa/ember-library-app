import Controller from '@ember/controller';
import { gte } from '@ember/object/computed';
import { match, not } from '@ember/object/computed';
import { and } from '@ember/object/computed';

export default Controller.extend({
    emailAddress: '',
    message: '',
    isLongEnough: gte("message.length", 5),
    isValid: match('emailAddress', /^.+@.+\..+$/),
    isBothTrue: and('isValid', 'isLongEnough'),
    isDisabled: not('isBothTrue'),
    actions: {
        saveInvitation() {
            const email = this.get('emailAddress');
            const message = this.get('message');
            const newInvitation = this.store.createRecord('contact', { email: email, message: message });
            newInvitation.save().then(response => {
                this.set('responseMessage', `Thank you! We saved your message, will respond asap`);
                this.set('emailAddress', '');
                this.set('message', '');
            })
            .catch( error => { this.set('responseMessage', error)})
          }
    }
});
