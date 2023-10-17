const { default: Stripe } = require('stripe');

class StripeService {
  constructor() {
    this.stripe = new Stripe('sk_test_51O22IMB3JMOseoQbIdKKDG1orDHtT7w9FjnbTnCczCpJ4i5tcftd98T2n4iaQnWM5MBwUnpY9ZI4iwpqPYM3jX9w00Zg0OhvVA');
  }
  createPaymentIntents(data) {
    return this.stripe.paymentIntents.create(data);
  }
}
module.exports = new StripeService();