import {
    createCheckoutSession,
    getStripePayments,
} from '@stripe/firestore-stripe-payments';
import app from './firebase';

//* initialize a library by app from firebase
const payments = getStripePayments(app, {
    productsCollection: 'products',
    customersCollection: 'customer',
});

//* create checkout session
const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin, //* root url now
        cancel_url: window.location.origin,
    })
        .then((snapshot) => window.location.assign(snapshot.url)) //todo navigate to snapshot.url
        .catch((error) => console.log(error));
};

export { loadCheckout };
export default payments;
